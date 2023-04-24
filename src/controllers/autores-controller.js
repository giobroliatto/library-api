import {autores} from "../models/index.js";

class AutorController {

  // GET todos autores
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (erro) {
      next(erro);
    }
  };

  // GET por id
  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const autorResultado = await autores.findById(id);

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        res.status(404).send({message: "id do autor não localizado"});
      }
    } catch (erro) {
      next(erro); // enviando pro app.js na função app.use(), que irá tratar os erros
    }
  };

  // POST
  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const autorCriado = await autor.save();

      res.status(201).send(autorCriado);

    } catch (erro) {
      next(erro);
    }
  };

  // PUT
  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorParaAlterar = await autores.findByIdAndUpdate(id, {$set: req.body});

      if (autorParaAlterar !== null) {
        res.status(200).send({message: `autor '${autorParaAlterar.nome}' atualizado com sucesso para '${req.body.nome}'`});
      } else {
        res.status(404).send({message: "id do autor não localizado"});
      }


    } catch (erro) {
      next(erro);
    }
  };

  // DELETE
  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorExcluido = await autores.findByIdAndDelete(id);

      if (autorExcluido !== null) {
        res.status(200).send({message: `autor '${autorExcluido.nome}' removido com sucesso!`});
      } else {
        res.status(404).send({message: "id do autor não localizado"});
      }

    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;