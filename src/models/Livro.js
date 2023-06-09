import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

// montando o schema que será usado na coleção de livros
const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, "o campo 'titulo' é obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "autores", 
      required: [true, "o campo 'autor' é obrigatório"],
      autopopulate: true
    },
    editora: {
      type: String, 
      required: [true, "o campo 'editora' é obrigatório"]
    },
    numPag: {
      type: Number,
      min: [1, "o número mínimo de páginas é 1"],
      max: [5000, "o número máximo de páginas é 5000"]
    },
  }
);

// usado para popular algum campo presente em livros utilizando valor de outra tabela automaticamente
livroSchema.plugin(autopopulate);
// criando variável que será o vínculo com a coleção do banco (se não existisse uma coleção chamada 'livros', ele criaria automático)
const livros = mongoose.model("livros", livroSchema);

export default livros;