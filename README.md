<div align="center">

<img src="docs/icon.svg" width="72" alt="library-api logo" />

# library-api

**REST API for a book catalog, built with Express and Mongoose, featuring centralized error handling, filters and pagination.**

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)

[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

</div>

**English** · [Português](README.pt-BR.md)

> [!NOTE]
> Built during [Alura](https://www.alura.com.br/)'s Node.js and Express REST API courses. The domain (routes, fields and error messages) and the code comments are in Portuguese. The class-by-class study notes are in [`cmds.txt`](cmds.txt).

---

## About

The API manages **books** and **authors** stored in MongoDB. It started as a simple CRUD and evolved, class by class, toward what a production API needs: environment variables, linting, consistent error handling, validation, search and pagination.

## Technical highlights

- **Centralized error handling:** a single Express error middleware turns any error into a standard response. Each type (`RequisicaoIncorreta` 400, `NaoEncontrado` 404, `ErroValidacao` 400, `ErroBase` 500) is a class that extends a base class with an `enviarResposta()` method. A 404 middleware registered after the routes catches unknown URLs.
- **Mongoose validation:** required fields with custom messages, `min`/`max` on page count, and a global validator that rejects empty strings in every schema ([`validador-global.js`](src/models/validador-global.js), currently disabled in `models/index.js`).
- **Dynamic search:** `/livros/busca` combines filters by publisher, title (case-insensitive `$regex`), page range (`$gte`/`$lte`) and author name, which requires a second query against the authors collection.
- **Reusable pagination middleware:** controllers only build the query and store it in `req.resultado`. The `paginar` middleware then applies `sort`, `skip` and `limit` based on `?limite=`, `?pagina=` and `?ordenacao=campo:1|-1`.
- **Automatic populate:** `mongoose-autopopulate` fills in each book's author without calling `.populate()` in every controller.
- **async/await everywhere,** with errors forwarded through `next(erro)`.

## Routes

| Method | Route | Description |
|---|---|---|
| `GET` | `/livros` | Lists books (paginated) |
| `GET` | `/livros/busca` | Search by `editora`, `titulo`, `minPaginas`, `maxPaginas`, `nomeAutor` (paginated) |
| `GET` | `/livros/:id` | One book |
| `POST` | `/livros` | Creates a book |
| `PUT` | `/livros/:id` | Updates a book |
| `DELETE` | `/livros/:id` | Removes a book |
| `GET` | `/autores` | Lists authors (paginated) |
| `GET` / `POST` / `PUT` / `DELETE` | `/autores/:id` | Author CRUD |

Paginated routes accept `?limite=10&pagina=2&ordenacao=titulo:-1`.

## Running locally

Requirements: Node.js 18+ and a MongoDB instance (local or Atlas).

```bash
git clone https://github.com/giobroliatto/library-api.git
cd library-api
npm install
echo 'STRING_CONEXAO_DB=mongodb://localhost:27017/library' > .env
npm run dev
```

The API runs at http://localhost:3000.

| Variable | Description |
|---|---|
| `STRING_CONEXAO_DB` | MongoDB connection string |
| `PORT` | Server port (default `3000`) |

## Structure

```
src/
├── app.js            # Express, routes and error middlewares
├── config/           # MongoDB connection
├── models/           # Schemas for books and authors, global validator
├── controllers/      # Routing logic and query building
├── routes/           # Routes per resource
├── middlewares/      # Pagination, 404 and error handler
└── errors/           # Error classes (base, 400, 404, validation)
```

---

## License

[MIT](LICENSE)

---

## Author

Made by **Giovani Broliatto**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-giobroliatto-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giobroliatto/)
