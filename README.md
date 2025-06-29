# Projeto Task Manager Full-Stack

Este é um projeto full-stack construído com **React (Vite/TypeScript)** para o frontend e **C# (.NET Web API)** com **Clean Architecture** para o backend, utilizando **SQL Server** para o banco de dados. O projeto visa demonstrar boas práticas de desenvolvimento, performance, manutenibilidade, segurança e gerenciamento de banco de dados.

## 🚀 Tecnologias Utilizadas

### Frontend

- **React (com Vite)**: Biblioteca JavaScript para construção de interfaces de usuário reativas.
- **TypeScript**: Superconjunto do JavaScript que adiciona tipagem estática, melhorando a manutenibilidade e a detecção de erros.
- **Chakra UI**: Biblioteca de componentes React acessíveis e composíveis para construção rápida de UIs.
- **React Router DOM**: Gerenciamento de rotas e navegação no frontend.
- **Axios**: Cliente HTTP para fazer requisições à API do backend.
- **React Hook Form**: Gerenciamento de formulários no React.

### Backend

- **C# (.NET 9.0 Web API)**: Framework robusto para construção de APIs RESTful.
- **Clean Architecture**: Estrutura de projeto em camadas para garantir separação de responsabilidades, testabilidade e manutenibilidade (Domain, Application, Infrastructure, Presentation).
- **Entity Framework Core (EF Core)**: ORM para acesso e gerenciamento de banco de dados.
- **SQL Server**: Banco de dados relacional.
- **JWT (JSON Web Tokens)**: Padrão para autenticação de usuário stateless e segura.
- **BCrypt.Net-Next**: Biblioteca para hashing seguro de senhas (implementação customizada).

## 📦 Estrutura do Projeto

O projeto adota uma arquitetura de "monorepo leve", com o frontend e o backend em pastas separadas na raiz do projeto.

task-manager/
├── task-manager-frontend/          # Projeto React (Vite + TypeScript)
│   ├── public/
│   ├── src/
│   │   ├── components/             # Componentes reutilizáveis
│   │   ├── context/                # Contextos (ex: Auth)
│   │   ├── factories/              # Design Pattern: Factory
│   │   ├── hooks/                  # Custom hooks
│   │   ├── models/                 # Modelos/Entidades
│   │   ├── pages/                  # Páginas (Home, Login, Register, etc.)
│   │   ├── routes/                 # Definições de rotas
│   │   ├── services/               # Serviços/API (Axios)
│   │   ├── strategies/             # Design Pattern: Strategy
│   │   ├── theme/                  # Temas do Chakra UI
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── main.tsx                # Ponto de entrada do React
│   │   └── dockerfile
│   ├── index.html
│   ├── package.json
│   └── tsconfig.json
│
└── task-manager-backend/           # Projeto C# (.NET Web API com Clean Architecture)
    ├── task-manager.sln            # Solução .NET
    ├── dockerfile
    ├── Domain/                     # Camada de Domínio
    │   ├── Entities/               # Entidades (Produto, Categoria, Usuário, etc.)
    │   └── Interfaces/             # Contratos (interfaces de repositório)
    ├── Application/                # Camada de Aplicação
    │   ├── Commands/               # Casos de uso (ex: AuthCommands)
    │   └── Services/               # Serviços usados pelos controllers
    ├── Infrastructure/             # Camada de Infraestrutura
    │   ├── Data/                   # DbContext
    │   ├── Migrations/             # Migrations do banco de dados
    │   └── Repositories/           # Implementações dos repositórios
    ├── Presentation/               # Camada de Apresentação (API REST)
    │   ├── Controllers/            # Endpoints da API
    │   ├── Properties/
    │   │   └── launchSettings.json # Configurações de execução (portas, etc.)
    │   ├── appsettings.json        # Configurações da aplicação (Connection String, JWT)
    │   ├── Program.cs              # Ponto de entrada da API, DI, Middlewares
    │   └── Presentation.csproj
    └── .gitignore

## 📋 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (versão LTS recomendada): [https://nodejs.org/](https://nodejs.org/)
- **.NET SDK 9.0** (ou mais recente): [https://dotnet.microsoft.com/download](https://dotnet.microsoft.com/download)
- docker-desktop: [https://www.docker.com/products/docker-desktop/]

## 🚀 Como Iniciar o Projeto

Este projeto adota uma estrutura de monorepo. Você pode configurá-lo e rodá-lo seguindo estes passos:

1.  **Baixe o Projeto:** Clone este repositório ou baixe o código-fonte.
2.  Rode o comando : docker-compose up --build
3.  (opcional) docker-compose up --build --scale task-manager-api=3 # replica a API para 3 instâncias (load balancing)

### **Configuração Pós-Setup (Importante!)**

Após a execução do script, você precisa realizar um passo manual crucial:

1.  **Gerar e Aplicar a Migration Inicial:**
    - No terminal, navegue até a **raiz da solução do backend**: `cd [NomeDoProjeto]/[NomeDoProjeto]-backend/`.
    - Crie a migration inicial para criar a tabela de usuários e outras tabelas necessárias: (caso nao exista)
      ```bash
      dotnet ef migrations add InitialSchema -p Infrastructure -s Presentation
      ```
    - Aplique a migration ao banco de dados:
      ```bash
      dotnet ef database update -p Infrastructure -s Presentation
      ```

## ▶️ Rodando a Aplicação

### 1. Iniciar o Frontend React

- Apos os passos o frontend estará disponível em `http://localhost:3000/`.

## 💡 Comandos Importantes

### Backend (na pasta `[NomeDoProjeto]-backend/` ou `[NomeDoProjeto]-backend/Presentation/` conforme o comando)

- **Compilar o projeto:**
  ```bash
  dotnet build
  ```
- **Rodar o projeto (API):**
  ```bash
  dotnet run --project Presentation/Presentation.csproj
  # Ou, se estiver na pasta Presentation:
  # dotnet run
  ```
- **Adicionar uma nova Migration:**
  _(Execute da raiz da solução do backend: `[NomeDoProjeto]-backend/`)_
  ```bash
  dotnet ef migrations add [NomeDaSuaMigration] -p Infrastructure -s Presentation
  ```
- **Aplicar Migrations ao Banco de Dados:**
  _(Execute da raiz da solução do backend: `[NomeDoProjeto]-backend/`)_
  ```bash
  dotnet ef database update -p Infrastructure -s Presentation
  ```
- **Remover a última Migration (CUIDADO!):**
  _(Execute da raiz da solução do backend: `[NomeDoProjeto]-backend/`)_
  ```bash
  dotnet ef migrations remove -p Infrastructure -s Presentation
  ```
- **Atualizar o banco de dados para uma migration específica (CUIDADO!):**
  _(Execute da raiz da solução do backend: `[NomeDoProjeto]-backend/`)_
  ```bash
  dotnet ef database update [NomeDaMigrationAlvo] -p Infrastructure -s Presentation
  ```
- **Restaurar pacotes NuGet:**
  ```bash
  dotnet restore
  ```

### Frontend (na pasta `[NomeDoProjeto]-frontend/`)

- **Instalar dependências:**
  ```bash
  npm install
  ```
- **Rodar o projeto em modo de desenvolvimento:**
  ```bash
  npm run dev
  ```
- **Compilar para produção:**
  ```bash
  npm run build
  ```

## 🔒 Autenticação e Autorização

O projeto utiliza um sistema de autenticação customizado com JWT.

### Testando Autenticação no Backend (via Swagger UI) # caso esteja rodando localmente

1.  Acesse o Swagger UI (`https://localhost:70XX/swagger`).
2.  **Registrar:** Use `POST /api/Auth/register` para criar um novo usuário.
3.  **Login:** Use `POST /api/Auth/login` com as credenciais do usuário para obter um JWT. Copie este token.
4.  **Autorizar Requisições:** Se o botão "Authorize" estiver visível, clique nele, cole o token no formato `Bearer SEU_TOKEN_AQUI` e clique em "Authorize". Caso contrário, você pode usar ferramentas como Postman ou Insomnia para testar os endpoints protegidos, adicionando o cabeçalho `Authorization: Bearer SEU_TOKEN_AQUI`.
5.  **Regerar Token:** Use `POST /api/Auth/refresh-token` (com um token JWT válido no cabeçalho `Authorization`) para obter um novo token.
6.  **Testar Autorização por Role:**
    - `GET /api/Produtos/admin-only`: Este endpoint exige a role "Admin".
      - Sem token: `401 Unauthorized`
      - Com token de "Customer": `403 Forbidden`
      - Para testar com "Admin": No SQL Server Management Studio/Azure Data Studio, edite a tabela `Usuarios`, localize seu usuário de teste e altere o valor da coluna `Roles` para `["Admin"]` (ou `["Customer", "Admin"]`). Em seguida, faça login novamente para obter um **novo token** que inclua a role "Admin".

### Testando Autenticação no Frontend

1.  No frontend (`http://localhost:8080/`), use os links "Registrar" e "Login" no cabeçalho.
2.  Registre e faça login.
3.  Observe como o cabeçalho muda para "Olá, [seu_username]!" e aparece o botão "Sair".
4.  O token é armazenado no `localStorage` do navegador e enviado automaticamente nas requisições para a API.

---
