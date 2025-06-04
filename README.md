# 🏁 Entrega 2 - API de Controle de Tarefas com Autenticação

## 📚 Descrição

Esta API RESTful foi desenvolvida para gerenciar tarefas e categorias com autenticação de usuários. Utiliza validação de dados com Zod, autenticação via JSON Web Token (JWT) e banco de dados relacional com Prisma ORM.

Usuários podem criar contas, fazer login, criar tarefas e categorias, e acessar apenas os dados que lhes pertencem.

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL (ou SQLite para testes)
- Zod (validação de dados)
- Bcrypt (criptografia de senhas)
- JSON Web Token (autenticação)
- Jest (testes automatizados)

---

## 🧪 Testes Automatizados

Testes automatizados foram incluídos para garantir o funcionamento correto das funcionalidades principais, incluindo autenticação, criação de tarefas e controle de acesso.

> ⚠️ Certifique-se de configurar a variável de ambiente `JWT_SECRET` para que os testes funcionem corretamente.

---

## 🧑‍💻 Rotas de Usuário

### 🔐 POST `/users` - Cadastro de usuário

**Corpo da requisição:**

```json
{
  "name": "John Doe",
  "email": "johndoe@email.com",
  "password": "12345678"
}
```

**Resposta (201):**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@email.com"
}
```

**Possíveis erros:**

- `409 Conflict` - Email já cadastrado  
  `{ "message": "This email is already registered" }`

- `400 Bad Request` - Corpo inválido (validação via Zod)

---

### 🔐 POST `/users/login` - Login de usuário

**Corpo da requisição:**

```json
{
  "email": "johndoe@email.com",
  "password": "12345678"
}
```

**Resposta (200):**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huZG9lQGVtYWlsLmNvbSIsImlhdCI6MTc0OTAzMjY5NywiZXhwIjoxNzQ5MTE5MDk3fQ.gvH3rbBTVI20PeOxHLMXTZcqfRCmxl2uGS_GR88YO6E",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@email.com"
  }
}
```

**Possíveis erros:**

- `404 Not Found` - Usuário não encontrado  
  `{ "messsage": "User not exists" }`

- `401 Unauthorized` - Email e senha não correspondem  
  `{ "messsage": "Email and password doesn't match" }`

- `400 Bad Request` - Corpo inválido

---

### 🔐 GET `/users/profile` - Recuperação do perfil

> **Token JWT necessário no header Authorization**

**Resposta (200):**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@email.com"
}
```

**Erros possíveis:**

- `401 Unauthorized` - Token ausente  
  `{ "messsage": "Token is required" }`

- `401 Unauthorized` - Token inválido  
  (mensagem fornecida pelo JWT)

---

## ✅ Rotas de Tarefas

### **🔐 Todas as rotas de tarefas requerem autenticação via token.**

### POST `/tasks` - Criar nova tarefa

Associa a tarefa ao usuário autenticado via token.

**Corpo da requisição:**

```json
{
  "title": "React",
  "content": "Estudar React de tarde",
  "categoryId": 1
}
```

**Resposta (201):**

```json
{
  "id": 1,
  "title": "React",
  "content": "Estudar React de tarde",
  "finished": false,
  "categoryId": 1,
  "userId": 1
}
```

### GET `/tasks` - Listar tarefas do usuário

Traz apenas as tarefas do usuário autenticado.  
Filtragem por categoria só é possível se a categoria também pertencer ao usuário.

**Resposta (200):**

```json
[
  {
    "id": 1,
    "title": "React",
    "content": "Estudar React de tarde",
    "finished": false,
    "categoryId": 1,
    "category": {
      "id": 1,
      "name": "Estudos"
    }
  },
  {
    "id": 2,
    "title": "NodeJs",
    "content": "Estudar nodeJs amanhã",
    "finished": false,
    "categoryId": 1,
    "category": {
      "id": 1,
      "name": "Estudos"
    }
  }
]
```

### GET `/tasks/:id` - Obter tarefa por ID

Disponível somente se a tarefa for do usuário autenticado.

**Resposta (200):**

```json
{
  "id": 2,
  "title": "NodeJs",
  "content": "Estudar nodeJs amanhã",
  "finished": false,
  "categoryId": 1
}
```

### PATCH `/tasks/:id` - Atualizar tarefa

Somente o dono da tarefa pode atualizá-la.

**Resposta (200):**

```json
{
  "id": 2,
  "title": "NodeJs",
  "content": "Estudar nodeJs Sexta",
  "finished": false,
  "categoryId": 1,
  "userId": 1
}
```

### DELETE `/tasks/:id` - Excluir tarefa

Somente o dono da tarefa pode deletá-la.

**Resposta (204):**

---

**Erro (403 Forbidden):**

```json
{ "message": "This user is not the task owner" }
```

---

## 🗂️ Rotas de Categorias

> Também requerem autenticação via token.

### POST `/categories` - Criar categoria

**Corpo da requisição:**

```json
{
  "name": "Estudos"
}
```

**Resposta (201):**

```json
{
  "id": 1,
  "name": "Estudos",
  "userId": 1
}
```

Associa a nova categoria ao usuário autenticado.

### DELETE `/categories/:id` - Excluir categoria

Somente o dono da categoria pode excluí-la.

**Resposta (204):**

---

**Erro (403 Forbidden):**

```json
{ "message": "This user is not the category owner" }
```

---

## 🛡️ Middleware de Autenticação

- Decodifica o token JWT
- Armazena o ID do usuário em `res.locals`
- Protege rotas privadas contra acessos não autorizados
- Trata erros como token ausente ou inválido

---

## 🔐 Segurança

- Senhas são armazenadas criptografadas com `bcrypt`
- Tokens JWT com tempo de expiração

---

## 📦 Como rodar localmente

```bash
git clone <url-do-repositório>
cd <nome-da-pasta>
npm install
```

Configure um arquivo `.env` com:

```
DATABASE_URL=<sua-url-do-banco>
JWT_SECRET=<seu-segredo-jwt>
```

```bash
npx prisma migrate dev
npm run dev
```

Para rodar os testes:

```bash
npm run test
```

---
