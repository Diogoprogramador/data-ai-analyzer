const express = require('express');
const multer = require('multer');
const cors = require('cors');
const csv = require('csv-parser');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads', { recursive: true });
    }
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.csv', '.xlsx', '.xls'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Extensão de arquivo não permitida. Use: .csv, .xlsx, .xls'), false);
    }
  }
});

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads', { recursive: true });
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Arquivo muito grande. Tamanho máximo: 10MB' });
    }
    return res.status(400).json({ error: 'Erro no upload: ' + error.message });
  }
  
  if (error.message.includes('Extensão de arquivo não permitida')) {
    return res.status(400).json({ error: error.message });
  }
  
  res.status(500).json({ error: 'Erro interno do servidor: ' + error.message });
});

function parseFile(filePath) {
  return new Promise((resolve, reject) => {
    const ext = path.extname(filePath).toLowerCase();
    console.log('Parsing file:', filePath, 'with extension:', ext);
    
    if (ext === '.csv') {
      const results = [];
      fs.createReadStream(filePath, { encoding: 'utf8' })
        .pipe(csv({
          skipEmptyLines: true,
          trim: true
        }))
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', () => {
          console.log('CSV parsing completed. Rows parsed:', results.length);
          resolve(results);
        })
        .on('error', (error) => {
          console.error('CSV parsing error:', error);
          reject(error);
        });
    } else if (ext === '.xlsx' || ext === '.xls') {
      try {
        console.log('Parsing Excel file...');
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        console.log('Excel sheet name:', sheetName);
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        console.log('Excel parsing completed. Rows parsed:', data.length);
        resolve(data);
      } catch (error) {
        console.error('Excel parsing error:', error);
        reject(error);
      }
    } else {
      const error = new Error('Unsupported file format: ' + ext);
      console.error(error.message);
      reject(error);
    }
  });
}

function analyzeData(data) {
  if (!data || data.length === 0) {
    return { error: 'No data available for analysis' };
  }

  const columns = Object.keys(data[0]);
  const numericColumns = columns.filter(col => {
    return data.every(row => !isNaN(parseFloat(row[col])) && isFinite(row[col]));
  });

  const textColumns = columns.filter(col => !numericColumns.includes(col));

  const analysis = {
    totalRows: data.length,
    totalColumns: columns.length,
    numericColumns: numericColumns,
    textColumns: textColumns,
    columnTypes: {}
  };

  columns.forEach(col => {
    const uniqueValues = [...new Set(data.map(row => row[col]))];
    analysis.columnTypes[col] = {
      type: numericColumns.includes(col) ? 'numeric' : 'text',
      uniqueValues: uniqueValues.length,
      sampleValues: uniqueValues.slice(0, 5)
    };
  });

  if (numericColumns.length > 0) {
    analysis.statistics = {};
    numericColumns.forEach(col => {
      const values = data.map(row => parseFloat(row[col])).filter(val => !isNaN(val));
      analysis.statistics[col] = {
        min: Math.min(...values),
        max: Math.max(...values),
        mean: values.reduce((a, b) => a + b, 0) / values.length,
        median: values.sort((a, b) => a - b)[Math.floor(values.length / 2)]
      };
    });
  }

  return analysis;
}

function generateChartConfigurations(analysis, data) {
  const charts = [];

  if (analysis.numericColumns.length >= 1) {
    charts.push({
      type: 'bar',
      title: `Distribution of ${analysis.numericColumns[0]}`,
      data: {
        labels: data.slice(0, 10).map((_, index) => `Row ${index + 1}`),
        datasets: [{
          label: analysis.numericColumns[0],
          data: data.slice(0, 10).map(row => parseFloat(row[analysis.numericColumns[0]])),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      }
    });
  }

  if (analysis.textColumns.length >= 1 && analysis.numericColumns.length >= 1) {
    const aggregatedData = {};
    data.forEach(row => {
      const category = row[analysis.textColumns[0]];
      const value = parseFloat(row[analysis.numericColumns[0]]) || 0;
      if (!aggregatedData[category]) {
        aggregatedData[category] = 0;
      }
      aggregatedData[category] += value;
    });

    const sortedCategories = Object.entries(aggregatedData)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    charts.push({
      type: 'pie',
      title: `${analysis.numericColumns[0]} by ${analysis.textColumns[0]}`,
      data: {
        labels: sortedCategories.map(([category]) => category),
        datasets: [{
          data: sortedCategories.map(([, value]) => value),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 205, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(199, 199, 199, 0.6)',
            'rgba(83, 102, 255, 0.6)',
            'rgba(255, 99, 255, 0.6)',
            'rgba(99, 255, 132, 0.6)'
          ]
        }]
      }
    });
  }

  if (analysis.numericColumns.length >= 2) {
    charts.push({
      type: 'scatter',
      title: `${analysis.numericColumns[0]} vs ${analysis.numericColumns[1]}`,
      data: {
        datasets: [{
          label: 'Data Points',
          data: data.slice(0, 100).map(row => ({
            x: parseFloat(row[analysis.numericColumns[0]]) || 0,
            y: parseFloat(row[analysis.numericColumns[1]]) || 0
          })),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      }
    });
  }

  return charts;
}

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('Upload request received');
    
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File uploaded:', req.file.originalname, 'Size:', req.file.size, 'Path:', req.file.path);

    const data = await parseFile(req.file.path);
    console.log('Data parsed successfully. Total rows:', data.length);
    
    if (data.length === 0) {
      return res.status(400).json({ error: 'No data found in file' });
    }

    console.log('Sample data:', data[0]);
    
    const analysis = analyzeData(data);
    console.log('Analysis completed:', Object.keys(analysis));
    
    const charts = generateChartConfigurations(analysis, data);
    console.log('Charts generated:', charts.length);

    fs.unlinkSync(req.file.path);
    console.log('Temporary file deleted');

    res.json({
      success: true,
      analysis,
      charts,
      sampleData: data.slice(0, 10)
    });
  } catch (error) {
    console.error('Error processing file:', error);
    
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ error: 'Error processing file: ' + error.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
