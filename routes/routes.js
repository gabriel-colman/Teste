const express = require("express");
const router = express.Router();
const User = require("../model/schema"); // import o schema do banco de dados

//inserir um usuário na rota do banco de dados
router.post("/add", (req, res) => {
  console.log(req);
  const user = new User({
    nome: null,
    email: req.body.email,
    cpf: req.body.cpf,
  });
  console.log(req.body);
  user.save((err) => {
    if (err) {
      res.json({ message: err.message, type: "danger" });
    } else {
      req.session.message = {
        type: "sucesso",
        message: "Usuário adicionado com sucesso",
      };
      res.redirect("/");
    }
  });
});

// obtém todas as rotas do usuário
router.get("/", (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      res.json({
        message: err.message,
      });
    } else {
      res.render("index", {
        title: "Pagina inicial",
        users: users,
      });
    }
  });
});

router.get("/add", (req, res) => {
  res.render("add_users", { title: "Adicionar usuários" });
});

//editar rota do usuário
router.get("/edit/:id", (req, res) => {
  let id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) {
      res.redirect("/");
    } else {
      if (user == null) {
        res.redirect("/");
      } else {
        res.render("edit_users", {
          title: "Edit User",
          user: user,
        });
      }
    }
  });
});

//atualiza a rota do usuário
router.post("/update/:id", (req, res) => {
  let id = req.params.id;
  User.findByIdAndUpdate(
    id,
    {
      // atualiza o usuário
      nome: req.body.nome,
      email: req.body.email,
      cpf: req.body.cpf,
    },
    (err, result) => {
      if (err) {
        res.json({ message: err.message, type: "danger" });
      } else {
        req.session.message = {
          type: "sucesso",
          message: "Usuário atualizado com sucesso!",
        };
        res.redirect("/");
      }
    }
  );
});

//deleta a rota do usuário
router.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  User.findByIdAndRemove(id, (err, result) => {
    // deleta o usuário
    if (err) {
      res.json({
        message: err.message,
      });
    } else {
      req.session.message = {
        type: "info",
        message: "User Deleted Successfully!",
      };
      res.redirect("/");
    }
  });
});

module.exports = router;
