const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  nome: {
    type: String,
    required: true, // Torna o campo 'nome' obrigatório, se necessário
  },
  email: {
    type: String,
    required: true, // Torna o campo 'email' obrigatório
  },
  cpf: {
    type: String,
    required: true, // Torna o campo 'cpf' obrigatório
  },
});

module.exports = mongoose.model("User", userSchema);
