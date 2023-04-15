/* aqui será feita a implementação de cada método que será usado na API (GET, POST, PUT, DELETE) */

import livros from "../models/Livro.js";

class LivroController {

  // GET todos livros
  static listarLivros = (req, res) => {
    livros.find()
      .populate("autor")
      .exec((err, livros) => {
        res.status(200).json(livros);
      });
  };

  // GET por id
  static listarLivroPorId = (req, res) => {
    const id = req.params.id;

    livros.findById(id)
      .populate("autor", "nome")
      .exec((err, livro) => {
        if (err) {
          res.status(400).send({message: `${err.message} - o id '${id}' não existe.`});
        } else {
          res.status(200).send(livro);
        }
      });
  };

  // GET por editora
  static listarLivrosPorEditora = (req, res) => {
    const editora = req.query.editora;

    livros.find({"editora": editora}, {}, (err, livros) => {
      res.status(200).send(livros);
    });
  };

  // POST
  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body);

    livro.save(err => {
      if (err) {
        res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`});
      } else {
        res.status(201).send(livro.toJSON());
      }
    });
  };

  // PUT
  static atualizarLivro = (req, res) => {
    const id = req.params.id;

    livros.findByIdAndUpdate(id, {$set: req.body}, err => {
      if (!err) {
        console.log(req.body);
        res.status(200).send(`Livro '${req.body.titulo}' atualizado com sucesso!`);
      } else {
        res.status(500).send({message: err.message});
      }
    });
  };

  // DELETE
  static excluirLivro = (req, res) => {
    const id = req.params.id;

    livros.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({message: "Livro removido com sucesso!"});
      } else {
        res.status(500).send({message: err.message});
      }
    });
  };
  

}

export default LivroController;