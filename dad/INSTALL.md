# 📋 Guia de Instalação

## Pré-requisitos

Antes de rodar a aplicação, você precisa instalar o Node.js e o npm no seu sistema.

### Instalação no Ubuntu/Debian

```bash
# Atualize o sistema
sudo apt update

# Instale Node.js e npm
sudo apt install nodejs npm

# Verifique as instalações
node --version
npm --version
```

### Instalação via NodeSource (Recomendado)

Para obter a versão mais recente do Node.js:

```bash
# Adicione o repositório NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Instale o Node.js
sudo apt-get install -y nodejs

# Verifique a instalação
node --version
npm --version
```

### Instalação no Windows

1. Baixe o instalador do site oficial: https://nodejs.org/
2. Execute o instalador e siga as instruções
3. Verifique a instalação abrindo o PowerShell/CMD e digitando:
   ```cmd
   node --version
   npm --version
   ```

### Instalação no macOS

```bash
# Usando Homebrew
brew install node

# Ou baixe o instalador do site oficial
# https://nodejs.org/
```

## Passos para Rodar a Aplicação

### 1. Clone o Repositório
```bash
git clone <seu-repositorio>
cd data-ai-analyzer
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Configure as Variáveis de Ambiente
```bash
cp .env.example .env
# Edite o arquivo .env se necessário
```

### 4. Inicie o Servidor
```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Modo produção
npm start
```

### 5. Acesse a Aplicação
Abra seu navegador e acesse: http://localhost:3000

## Solução de Problemas

### Node.js não encontrado
Se você receber o erro "Comando 'npm' não encontrado" ou "Comando 'node' não encontrado":

1. **Verifique se o Node.js está instalado:**
   ```bash
   which node
   which npm
   ```

2. **Se não estiver instalado, siga os passos de instalação acima**

3. **Reinicie seu terminal após a instalação**

### Problemas de Permissão
Se você tiver problemas de permissão:

```bash
# Evite usar sudo com npm. Em vez disso, configure o npm corretamente:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Porta Ocupada
Se a porta 3000 estiver ocupada:

```bash
# Verifique o que está usando a porta
sudo lsof -i :3000

# Ou use outra porta
PORT=8080 npm start
```

### Dependências Não Instaladas
Se as dependências não forem instaladas corretamente:

```bash
# Limpe o cache do npm
npm cache clean --force

# Delete node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstale
npm install
```

## Verificação da Instalação

Após a instalação, verifique se tudo está funcionando:

1. **Verifique as versões:**
   ```bash
   node --version  # Deve ser v16+ 
   npm --version   # Deve ser 8+
   ```

2. **Verifique as dependências:**
   ```bash
   ls node_modules  # Deve mostrar as pastas das dependências
   ```

3. **Teste o servidor:**
   ```bash
   npm start
   ```
   Você deverá ver: `Server running on port 3000`

## Próximos Passos

Após a instalação bem-sucedida:

1. Abra http://localhost:3000 no seu navegador
2. Faça upload de um arquivo CSV ou Excel para testar
3. Explore os gráficos gerados automaticamente

## Suporte

Se você ainda tiver problemas:

1. Verifique o log de erros no terminal
2. Abra uma issue no GitHub
3. Consulte a documentação completa em README.md
