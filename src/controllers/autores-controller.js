import autores from "../models/Autor.js";

class AutorController {

  // GET todos autores
  static listarAutores = (req, res) => {
    autores.find((err, autores) => {
      res.status(200).json(autores);
    });
  }

  // GET por id
  static listarAutorPorId = (req, res) => {
    const id = req.params.id;

    autores.findById(id, (err, livro) => {
      if (err) {
        res.status(400).send({message: `${err.message} - o id '${id}' não existe.`})
      } else {
        res.status(200).send(livro)
      }
    })
  }

  // POST
  static cadastrarAutor = (req, res) => {
    let livro = new autores(req.body);

    livro.save(err => {
      if (err) {
        res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`});
      } else {
        res.status(201).send(livro.toJSON());
      }
    });
  };

  // PUT
  static atualizarAutor = (req, res) => {
    const id = req.params.id;

    autores.findByIdAndUpdate(id, {$set: req.body}, err => {
      if (!err) {
        console.log(req.body)
        res.status(200).send(`Autor '${req.body.nome}' atualizado com sucesso!`);
      } else {
        res.status(500).send({message: err.message});
      }
    });
  }

  // DELETE
  static excluirAutor = (req, res) => {
    const id = req.params.id;

    autores.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({message: 'Autor removido com sucesso!'});
      } else {
        res.status(500).send({message: err.message});
      }
    })
  }
  

}

export default AutorController;