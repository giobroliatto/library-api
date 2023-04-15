import autores from "../models/Autor.js";

class AutorController {

  // GET todos autores
  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (err) {
      res.status(500).json({ message: "Erro interno" });
    }
  };

  // GET por id
  static listarAutorPorId = async (req, res) => {
    try {
      const id = req.params.id;
  
      const autorResultado = await autores.findById(id);

      res.status(200).send(autorResultado);
    } catch (erro) {
      res.status(400).send({message: `${erro.message} - id do autor não localizado.`});
    }
  };

  // POST
  static cadastrarAutor = async (req, res) => {
    try {
      let autor = new autores(req.body);

      const autorCriado = await autor.save();

      res.status(201).send(autorCriado);

    } catch (erro) {
      res.status(500).send({message: "falha ao cadastrar autor."});
    }
  };

  // PUT
  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;

      const autorParaAlterar = await autores.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send(`autor '${autorParaAlterar.nome}' atualizado com sucesso para '${req.body.nome}'`);

    } catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };

  // DELETE
  static excluirAutor = async (req, res) => {
    try {
      const id = req.params.id;

      const autorExcluido = await autores.findByIdAndDelete(id);

      res.status(200).send({message: `autor '${autorExcluido.nome}' removido com sucesso!`});
    } catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };
}

export default AutorController;