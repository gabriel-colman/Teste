const mongo = require("mongoose");
const { Schema } = mongo;

const userSchema = new Schema({
  nome: {
    type: String,
  },
  email: {
    type: String,
  },
  cpf: {
    type: String,
  },
});

module.exports = mongo.model("User", userSchema);
