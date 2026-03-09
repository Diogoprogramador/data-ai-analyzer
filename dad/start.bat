@echo off
echo Instalando Data AI Analyzer...
echo.

REM Verifica se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js nao encontrado!
    echo Por favor, instale o Node.js em: https://nodejs.org/
    echo Depois volte e execute este arquivo novamente.
    pause
    exit /b 1
)

echo Node.js encontrado!
echo.

REM Instala dependências
echo Instalando dependencias...
npm install
if %errorlevel% neq 0 (
    echo Erro ao instalar dependencias!
    pause
    exit /b 1
)

echo.
echo Iniciando servidor...
echo.
echo A aplicacao estara disponivel em: http://localhost:3000
echo Pressione Ctrl+C para parar o servidor.
echo.

npm start
