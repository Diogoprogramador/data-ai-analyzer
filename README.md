# 📊 Data AI Analyzer

Uma aplicação web completa para análise inteligente de dados com geração automática de gráficos utilizando Inteligência Artificial.

## 🚀 Funcionalidades

- **Upload Arrastar e Soltar**: Interface intuitiva para upload de arquivos CSV e Excel
- **Análise Automática**: Detecção automática de tipos de dados e estatísticas
- **Geração de Gráficos**: Criação automática de múltiplos tipos de gráficos
- **Interface Responsiva**: Design moderno que funciona em todos os dispositivos
- **Processamento em Tempo Real**: Análise instantânea dos dados uploaded

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para API REST
- **Multer** - Middleware para upload de arquivos
- **CSV Parser** - Processamento de arquivos CSV
- **XLSX** - Processamento de arquivos Excel
- **OpenAI** - Análise avançada com IA (opcional)

### Frontend
- **HTML5** - Estrutura semântica
- **Tailwind CSS** - Framework CSS utilitário
- **Chart.js** - Biblioteca para visualização de dados
- **JavaScript Vanilla** - Lógica do cliente

## 📦 Instalação

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/Diogo/data-ai-analyzer.git
cd data-ai-analyzer
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Inicie o servidor**
```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm start
```

5. **Acesse a aplicação**
Abra seu navegador e acesse `http://localhost:3000`

## 🎯 Como Usar

1. **Upload de Arquivo**
   - Arraste e solte um arquivo CSV ou Excel na área designada
   - Ou clique no botão para escolher um arquivo

2. **Análise Automática**
   - O sistema processará automaticamente seus dados
   - Identificará colunas numéricas e de texto
   - Calculará estatísticas básicas

3. **Visualização**
   - Gráficos serão gerados automaticamente
   - Visualize estatísticas gerais
   - Explore uma amostra dos seus dados

## 📊 Tipos de Gráficos Gerados

- **Gráfico de Barras**: Para distribuição de dados numéricos
- **Gráfico de Pizza**: Para análise categorial
- **Gráfico de Dispersão**: Para correlação entre variáveis numéricas

## 🏗️ Estrutura do Projeto

```
data-ai-analyzer/
├── public/
│   └── index.html          # Frontend da aplicação
├── uploads/                # Diretório temporário para uploads
├── server.js              # Servidor backend
├── package.json           # Dependências do projeto
├── .env.example           # Exemplo de variáveis ambiente
└── README.md              # Documentação
```

## 🔧 Configuração Avançada

### Integração com OpenAI (Opcional)

Para análises mais avançadas usando IA:

1. Configure sua API Key da OpenAI no arquivo `.env`:
```
OPENAI_API_KEY=sua_api_key_aqui
```

2. A aplicação utilizará IA para:
   - Insights mais profundos sobre os dados
   - Recomendações de visualização
   - Análise preditiva básica

### Personalização

- **Estilos**: Modifique o CSS em `public/index.html`
- **Gráficos**: Configure as opções do Chart.js no frontend
- **Análises**: Estenda as funções de análise em `server.js`

## 🚀 Deploy

### Heroku
```bash
# Instale Heroku CLI
heroku create seu-app-name
git push heroku main
heroku open
```

### Vercel
```bash
# Instale Vercel CLI
vercel --prod
```

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Exemplos de Uso

### Análise de Vendas
- Upload de planilha de vendas
- Visualização de produtos mais vendidos
- Análise de tendências temporais

### Dados Financeiros
- Importação de extratos bancários
- Gráficos de despesas por categoria
- Análise de fluxo de caixa

### Pesquisa de Mercado
- Processamento de dados de pesquisa
- Visualização de respostas
- Análise demográfica

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙋‍♂️ Suporte

Se você tiver alguma dúvida ou sugestão:

- Abra uma [Issue](https://github.com/Diogo/data-ai-analyzer/issues)
- Envie um email para seu-email@exemplo.com

## 🌟 Recursos Futuros

- [ ] Integração com mais formatos de arquivo
- [ ] Análise preditiva avançada
- [ ] Exportação de relatórios em PDF
- [ ] Dashboard interativo
- [ ] Autenticação de usuários
- [ ] Processamento de grandes volumes de dados

---

**Desenvolvido com ❤️ para análise inteligente de dados**
