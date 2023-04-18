import express from "express";
import db from "./config/db-connect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipulador-de-erros.js";
import manipulador404 from "./middlewares/manipulador-404.js";

// inicializando o db
db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco realizada com sucesso");
});

// criando uma instância do framework express, que fará as requisições http de forma simplificada
const app = express();

// utilizado para que o app reconheça o que foi enviado pelo postman (via put ou post) e interprete no formato json
app.use(express.json());

// chamando a função "routes" que é responsável por receber e interpretar as rotas que devem ser utilizadas
routes(app);

app.use(manipulador404);
app.use(manipuladorDeErros);

export default app;