/* aqui será feito o controle das rotas de cada método da API, utilizando o express Router */

import express from "express";
import LivroController from "../controllers/livros-controller.js";

const router = express.Router();

router
  .get('/livros', LivroController.listarLivros)
  .get('/livros/busca', LivroController.listarLivrosPorEditora)
  .get('/livros/:id', LivroController.listarLivroPorId)
  .post('/livros', LivroController.cadastrarLivro)
  .put('/livros/:id', LivroController.atualizarLivro)
  .delete('/livros/:id', LivroController.excluirLivro);

export default router;