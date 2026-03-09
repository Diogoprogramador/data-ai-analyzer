// Script de teste para verificar o servidor
const fs = require('fs');
const path = require('path');

// Teste se os módulos necessários estão disponíveis
console.log('Verificando dependências...');

try {
  require('express');
  console.log('✅ Express.js disponível');
} catch (e) {
  console.log('❌ Express.js não encontrado. Execute: npm install express');
}

try {
  require('multer');
  console.log('✅ Multer disponível');
} catch (e) {
  console.log('❌ Multer não encontrado. Execute: npm install multer');
}

try {
  require('csv-parser');
  console.log('✅ CSV Parser disponível');
} catch (e) {
  console.log('❌ CSV Parser não encontrado. Execute: npm install csv-parser');
}

try {
  require('xlsx');
  console.log('✅ XLSX disponível');
} catch (e) {
  console.log('❌ XLSX não encontrado. Execute: npm install xlsx');
}

// Verifica se o arquivo de teste existe
const testFile = path.join(__dirname, 'teste.csv');
if (fs.existsSync(testFile)) {
  console.log('✅ Arquivo de teste CSV encontrado');
  const stats = fs.statSync(testFile);
  console.log(`   Tamanho: ${stats.size} bytes`);
} else {
  console.log('❌ Arquivo de teste CSV não encontrado');
}

// Verifica estrutura de diretórios
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  console.log('✅ Diretório public encontrado');
} else {
  console.log('❌ Diretório public não encontrado');
}

const indexFile = path.join(publicDir, 'index.html');
if (fs.existsSync(indexFile)) {
  console.log('✅ Arquivo index.html encontrado');
} else {
  console.log('❌ Arquivo index.html não encontrado');
}

console.log('\n📋 Para iniciar o servidor:');
console.log('1. Instale Node.js: https://nodejs.org/');
console.log('2. Instale dependências: npm install');
console.log('3. Inicie o servidor: npm start');
console.log('4. Acesse: http://localhost:3000');
