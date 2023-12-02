//import
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const PORT = 4000;

//conexao database
const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(
  "mongodb+srv://paulocorrea3dev:oooVrKB8wm28bn6g@cluster0.zglfvni.mongodb.net/LP4",
  option
);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("conectado ao banco de dados!!"));

//middle ware é um pedaço de código que é executado entre a requisição e a resposta
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(
//   session({
//     secret: "my secret key",
//     saveUninitialized: true,
//     resave: false,
//   })
// );
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: "my secret key",
  saveUninitialized: true,
  resave: false,
}));


app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(express.static("uploads"));
//chamando o template engine
app.set("view engine", "ejs");

//router
app.use("", require("./routes/routes"));

app.listen(PORT, () => {
  console.log(`O servidor rodando porta em http://localhost:${PORT}`);
});
