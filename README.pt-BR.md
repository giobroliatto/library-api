<div align="center">

<img src="docs/icon.svg" width="72" alt="Logo do library-api" />

# library-api

**API REST de um catálogo de livros, com Express e Mongoose, tratamento centralizado de erros, filtros e paginação.**

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)

</div>

[English](README.md) · **Português**

> [!NOTE]
> Projeto desenvolvido durante os cursos de API REST com Node.js e Express da [Alura](https://www.alura.com.br/). As anotações de estudo, aula por aula, estão em [`cmds.txt`](cmds.txt).

---

## Sobre

A API gerencia **livros** e **autores** guardados no MongoDB. Começou como um CRUD simples e foi evoluindo, aula a aula, para o que uma API de produção precisa: variáveis de ambiente, lint, tratamento de erros padronizado, validação, busca e paginação.

## Destaques técnicos

- **Tratamento centralizado de erros:** um único middleware de erro do Express transforma qualquer erro numa resposta padronizada. Cada tipo (`RequisicaoIncorreta` 400, `NaoEncontrado` 404, `ErroValidacao` 400, `ErroBase` 500) é uma classe que estende uma classe base com o método `enviarResposta()`. Um middleware de 404 registrado depois das rotas pega as URLs que não existem.
- **Validação no Mongoose:** campos obrigatórios com mensagens próprias, `min`/`max` no número de páginas e um validador global que recusa strings vazias em todos os schemas ([`validador-global.js`](src/models/validador-global.js), hoje desativado no `models/index.js`).
- **Busca dinâmica:** `/livros/busca` combina filtros por editora, título (`$regex` sem diferenciar maiúsculas), intervalo de páginas (`$gte`/`$lte`) e nome do autor, o que exige uma segunda consulta na coleção de autores.
- **Middleware de paginação reutilizável:** os controllers só montam a query e guardam em `req.resultado`. O middleware `paginar` aplica `sort`, `skip` e `limit` a partir de `?limite=`, `?pagina=` e `?ordenacao=campo:1|-1`.
- **Populate automático:** o `mongoose-autopopulate` preenche o autor de cada livro sem precisar chamar `.populate()` em todo controller.
- **async/await em tudo,** com os erros repassados via `next(erro)`.

## Rotas

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/livros` | Lista os livros (paginado) |
| `GET` | `/livros/busca` | Busca por `editora`, `titulo`, `minPaginas`, `maxPaginas`, `nomeAutor` (paginado) |
| `GET` | `/livros/:id` | Um livro |
| `POST` | `/livros` | Cadastra um livro |
| `PUT` | `/livros/:id` | Atualiza um livro |
| `DELETE` | `/livros/:id` | Remove um livro |
| `GET` | `/autores` | Lista os autores (paginado) |
| `GET` / `POST` / `PUT` / `DELETE` | `/autores/:id` | CRUD de autores |

As rotas paginadas aceitam `?limite=10&pagina=2&ordenacao=titulo:-1`.

## Rodando localmente

Pré-requisitos: Node.js 18+ e um MongoDB (local ou Atlas).

```bash
git clone https://github.com/giobroliatto/library-api.git
cd library-api
npm install
echo 'STRING_CONEXAO_DB=mongodb://localhost:27017/library' > .env
npm run dev
```

A API sobe em http://localhost:3000.

| Variável | Descrição |
|---|---|
| `STRING_CONEXAO_DB` | Connection string do MongoDB |
| `PORT` | Porta do servidor (padrão `3000`) |

## Estrutura

```
src/
├── app.js            # Express, rotas e middlewares de erro
├── config/           # Conexão com o MongoDB
├── models/           # Schemas de livros e autores, validador global
├── controllers/      # Lógica das rotas e montagem das queries
├── routes/           # Rotas por recurso
├── middlewares/      # Paginação, 404 e manipulador de erros
└── errors/           # Classes de erro (base, 400, 404, validação)
```

---

## Autor

Feito por **Giovani Broliatto**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-giobroliatto-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giobroliatto/)
