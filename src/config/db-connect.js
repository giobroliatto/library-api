import mongoose from "mongoose";

// conectando com o cloud db do mongodb. os passos pra criar o db são: criar uma organization, criar uma collection, criar o db e conectar o db através da função abaixo
mongoose.connect("")

let db = mongoose.connection;

export default db;