import app from "./src/app.js";

const port = process.env.PORT || 3000;

/* const rotas = {
  const http = require('http');
  const port = 3000;

  '/': 'curso de node',
  '/livros': 'pag de livros',
  '/autores': 'pag de autores',
  '/editora': 'pag de editora'
}

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  console.log(req)
  res.end(rotas[req.url]);
}); */

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});