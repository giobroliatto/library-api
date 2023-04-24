/* aqui será feita a implementação de cada método que será usado na API (GET, POST, PUT, DELETE) */

import {autores, livros} from "../models/index.js";

class LivroController {

  // GET todos livros
  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find().populate("autor").exec();

      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };

  // GET por id
  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        res.status(404).send({message: "id do livro não localizado"});
      }
    } catch (erro) {
      next(erro);
    }
  };

  // GET por filtro
  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = req.query;

      const busca = {};

      if (editora) busca.editora = editora;
      if (titulo) busca.titulo = { $regex: titulo, $options: "i" }; // o regex pro título é pra poder buscar qualquer título que CONTENHA o texto informado, e a tag "i" é pra não diferenciar minúsculas e maiúsculas
      if (minPaginas || maxPaginas) busca.numPag = {};
      if (minPaginas) busca.numPag.$gte = minPaginas;
      if (maxPaginas) busca.numPag.$lte = maxPaginas;
      if (nomeAutor) {
        const autor = await autores.findOne({ nome: nomeAutor });
        busca.autor = autor._id;
      }

      const livrosResultado = await livros.find(busca).populate("autor", "nome");

      // http://localhost:3000/livros/busca?editora=Geo&/titulo=Lógica de Programação

      res.status(200).send(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };

  // POST
  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  // PUT
  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroParaAtualizar = await livros.findByIdAndUpdate(id, {$set: req.body});

      if (livroParaAtualizar != null) {
        res.status(200).send({message: "livro atualizado com sucesso!"});
      } else {
        res.status(404).send({message: "id do livro não localizado"});
      }

    } catch (erro) {
      next(erro);
    }
  };

  // DELETE
  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroParaDeletar = await livros.findByIdAndDelete(id);

      if (livroParaDeletar !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        res.status(404).send({message: "id do livro não localizado"});
      }

    } catch (erro) {
      next(erro);
    }
  };
  

}

export default LivroController;