# Define a imagem base
FROM node:24-alpine AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Instala as dependências do projeto
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

# Fazer build do projeto
COPY . . 
RUN npm run build

# Expor a porta usada pelo servidor
EXPOSE 5173

# Rodar aplicação
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]