const express = require("express");
const router = express.Router();
const User = require("../model/schema"); // Certifique-se de que o caminho está correto

// Rota para adicionar um usuário
router.post("/add", (req, res) => {
  const { nome, email, cpf } = req.body;
  if (!email || !cpf) {
    return res.status(400).json({ message: "Email e CPF são obrigatórios", type: "danger" });
  }

  const user = new User({ nome, email, cpf });
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

// Rota para exibir todos os usuários
router.get("/", (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.render("index", { title: "Página Inicial", users: users });
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
