# 🟦 Backend – CONTEXTO (Desafio Técnico)

Este repositório contém a API backend do jogo *CONTEXTO*, desenvolvida com:

- *Node.js*
- *Fastify*
- *TypeScript*
- *Prisma ORM*
- *JWT Authentication*
- *Arquitetura em Camadas*
- *Banco SQLite (desenvolvimento)*

A API implementa o sistema completo de backend exigido no desafio técnico:  
registro, login, palavra do dia, tentativas, similaridade e controle de usuários.

---

# 📁 Estrutura do Projeto

backend-contexto/
│
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── prisma.ts
│   │
    ├── assets/
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── attempt.routes.ts
│   │   ├── admin.routes.ts
│   │   └── word.routes.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── attempt.controller.ts
│   │   ├── word.controller.ts
│   │   └── admin.controller.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── attempt.service.ts
│   │   ├── word.service.ts
│   │   └── similarity.ts
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.ts
│   │   └── adminMiddleware.ts
│   │
│   └── utils/
│       ├── app.ts
│       ├── prisma.ts
│       ├── server.ts 
│
├── prisma/
│   ├── schema.prisma
│   └── dev.db
│
├── dist/                # gerado após build
│
├── package.json
├── tsconfig.json
├── .env
└── README.md

---

# 🚀 Como Rodar o Projeto

## 1. *Clonar o repositório*
```bash
git clone https://github.com/seuusuario/backend-contexto.git
cd backend-contexto

2. Instalar dependências

npm install

3. Instalar Prisma CLI

npm install prisma --save-dev
npm install @prisma/client

4. Gerar o banco SQLite

npx prisma migrate dev --name init

> Isso cria o arquivo dev.db dentro da pasta /prisma.



5. Abrir o Prisma Studio (opcional)

npx prisma studio


---

▶️ Executar o Servidor

Ambiente de desenvolvimento:

npm run dev

Ambiente de produção:

npm run build
npm start


---

📜 Scripts Disponíveis

{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev --name init"
  }
}


---

🔐 Configuração do JWT

Crie um arquivo .env:

JWT_SECRET=minhachavesecreta123


---

🧪 Testando a API (Thunder Client ou Postman)

A seguir estão todos os testes necessários para validar 100% da API.


---

1️⃣ Registrar Usuário

POST /register

Body:

{
  "name": "Carlos",
  "email": "carlos@example.com",
  "password": "123456",
  "role": "admin"
}


---

2️⃣ Login

POST /login

Body:

{
  "email": "carlos@example.com",
  "password": "123456"
}

Resposta:

{
  "token": "JWT_AQUI"
}

Usar no Thunder Client → Headers

Authorization: Bearer SEU_TOKEN


---

3️⃣ Criar Palavra do Dia (ADMIN)

POST /admin/word

Headers:

Authorization: Bearer TOKEN_ADMIN

Body:

{
  "word": "sabedoria"
}


---

4️⃣ Ver o Tamanho da Palavra do Dia

GET /word-today

Resposta:

{
  "length": 9,
  "date": "2025-12-04"
}


---

5️⃣ Enviar Tentativa

POST /attempt

Headers:

Authorization: Bearer TOKEN_USER

Body:

{
  "word": "banana"
}

Resposta:

{
  "word": "banana",
  "similarity": 0.82,
  "rank": 152
}


---

6️⃣ Ver Minhas Tentativas

GET /me/attempts

Headers:

Authorization: Bearer TOKEN

Resposta:

[
  {
    "id": 1,
    "word": "banana",
    "similarity": 0.82,
    "rank": 152,
    "createdAt": "2025-12-04T19:20:00.000Z"
  }
]


---

🧠 Lógica de Similaridade

A lógica está no arquivo:

src/services/similarity.ts

Ela calcula:

similaridade numérica

ordenação

rank relativo conforme o algoritmo do desafio



---

🛡 Middlewares

🔒 Autenticação (JWT)

Local:

src/middlewares/authMiddleware.ts

Valida se o usuário está logado.

👑 Middleware ADMIN

Local:

src/middlewares/adminMiddleware.ts

Permite apenas usuários com role = "admin".


---

🧩 Rotas

Método	Rota	Descrição	Proteção

POST	/register	Registrar usuário	❌
POST	/login	Fazer login e gerar token	❌
GET	/word-today	Ver tamanho da palavra do dia	❌
POST	/attempt	Enviar tentativa	✔ JWT
GET	/me/attempts	Ver tentativas do usuário	✔ JWT
POST	/admin/word	Criar palavra do dia	✔ JWT + ADMIN



---

📦 Banco de Dados (Prisma)

Modelo principal

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  role      String   @default("user")
  attempts  Attempt[]
}

model WordOfTheDay {
  id    Int    @id @default(autoincrement())
  word  String
  date  DateTime @unique
}

model Attempt {
  id        Int    @id @default(autoincrement())
  word      String
  similarity Float
  rank       Int
  createdAt DateTime @default(now())
  userId    Int
  user      User      @relation(fields: [userId], references: [id])
}


---

🎯 Finalidade do Projeto

Este backend atende integralmente o desafio técnico, entregando:

Autenticação completa

Controle de papéis (user/admin)

Palavra do dia única

Cálculo de similaridade numérica

Ranking da tentativa

Histórico do usuário

Arquitetura limpa e escalável

Rotas protegidas por JWT

Prisma ORM com SQLite