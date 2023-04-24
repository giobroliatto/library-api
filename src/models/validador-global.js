import mongoose from "mongoose";

// definir uma propriedade para todos os campos tipo String
mongoose.Schema.Types.String.set("validate", {
  validator: (value) => value !== "",
  message: ({ path }) => `o campo ${path} não foi preenchido`
}); 