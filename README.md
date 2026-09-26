# MVP-DBA - *Book Review*

#### 1. Descrição

Uma plataforma que permite o usuário pesquisar e avaliar uma vasta seleção de livros, fornecidas pela [API pública da OpenLibrary](https://openlibrary.org/dev/docs/api/search). 

<img src="./Fluxograma%20projeto.png" alt="Fluxograma do projeto" width="700">

#### 2. Pré-Requisitos

1. Uma IDE de sua escolha (exemplo: Visual Studio Code)
2. [Git](https://git-scm.com/)
3. [Node.js](https://nodejs.org/pt-br) (v20 ou superior)
4. [Docker](https://www.docker.com/)

#### 3. Instalação e execução 

**ATENÇÃO**: Para que o projeto funcione corretamente, também será preciso executar o back-end. Clique [aqui](https://github.com/thelunacodes/MVP-DBA-Back-End) para mais informações.

**Passo 1 - Clone o repositório para sua máquina**

Em um terminal, execute os comandos:
 
    git clone https://github.com/thelunacodes/MVP-DBA-Front-End.git

**Passo 2 - Navegue para a pasta do projeto**

    cd MVP-DBA-Front-End

**Passo 3 - Instale as dependências do projeto**

    npm install

**Passo 4 - Inicie o servidor**

    npm run dev

Após a inicialização, acesse a URL exibida no terminal:

    http://localhost:<número de porta>

**Como o projeto é executado em um servidor de desenvolvimento local, ele só pode ser acessado pela sua máquina.**

#### 4. Execução através do Docker (opcional)

**Passo 1 - Siga os passos 1 e 2 do passo-a-passo anterior.**

**Passo 2 - Ainda na pasta raiz do projeto, construa a imagem Docker usando o comando COMO ADMINISTRADOR:**

**Linux**  

    sudo docker build -t mvp-dba-front-end .

**Windows (CMD/Powershell)**  

    docker build -t mvp-dba-front-end .

**Passo 3 - Após a criação do conteiner, execute-o com o seguinte comando (ainda como administrador):**

**Linux** 

    sudo docker run -p 5173:5173 mvp-dba-front-end

**Windows (CMD/Powershell)**  

    docker run -p 5173:5173 mvp-dba-front-end
