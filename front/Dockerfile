# Usar uma imagem oficial do Node.js como base
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app


# Copiar package.json e package-lock.json
COPY package.json ./

# Instalar dependências
RUN npm install

# Copiar o código do projeto
COPY . .


# Comando para iniciar o servidor Next.js
CMD ["npm", "run", "dev"]
