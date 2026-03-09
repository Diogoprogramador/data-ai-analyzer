#!/bin/bash

echo "🚀 Instalando Data AI Analyzer..."
echo

# Verifica se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado!"
    echo "Por favor, instale o Node.js:"
    echo "Ubuntu/Debian: sudo apt update && sudo apt install nodejs npm"
    echo "Ou baixe de: https://nodejs.org/"
    echo "Depois volte e execute este script novamente."
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo "✅ npm encontrado: $(npm --version)"
echo

# Instala dependências
echo "📦 Instalando dependências..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências!"
    exit 1
fi

echo
echo "🌟 Iniciando servidor..."
echo "📱 A aplicação estará disponível em: http://localhost:3000"
echo "⏹️  Pressione Ctrl+C para parar o servidor."
echo

npm start
