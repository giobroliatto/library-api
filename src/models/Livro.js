import mongoose from "mongoose";

// montando o schema que será usado na coleção de livros
const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {type: String, required: true},
    autor: {type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: true},
    editora: {type: String, required: true},
    numPag: {type: Number},
  }
);

// criando variável que será o vínculo com a coleção do banco (se não existisse uma coleção chamada 'livros', ele criaria automático)
const livros = mongoose.model('livros', livroSchema);

export default livros;