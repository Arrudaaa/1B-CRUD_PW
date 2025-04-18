const express = require('express');
const router = express.Router();
const { Professor , Materia } = require('../models');

// Mostrar todos os Professores
router.get("/",  async (req, res) => {
  try {
    const professores = await Professor.findAll({
      include: [{ model: Materia, as: "Materia" }],
    });
    res.render("base", {
      title: "Professores",
      view: "professores/show",
      Professores,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar professores");
  }
});

// Formulário para adicionar um novo Professor
router.get("/add",  async (req, res) => {
  try {
    const materias = await Materia.findAll();
    res.render("base", {
      title: "Add Professor",
      view: "professores/add",
      materias,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar materias");
  }
});

// Adicionar um novo professor
router.post("/add",  async (req, res) => {
  try {
    const { nome, telefone, materiaId } = req.body;
    await Professor.create({
      nome,
      telefone,
      materiaId,
    });
    res.redirect("/professores");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao adicionar professor");
  }
});

// Formulário para editar um Professores
router.get("/edit/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const professor = await Professor.findByPk(id, {
      include: [{ model: Materia, as: "Materia" }],
    });
    const materias = await Materia.findAll();
    if (professor) {
      res.render("base", {
        title: "Edit Professores",
        view: "professores/edit",
        professor,
        materias,
      });
    } else {
      res.status(404).send("Professor não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar Professor");
  }
});

// Atualizar um Professor
router.post("/edit/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, materiaId } = req.body;
    const professor = await Professor.findByPk(id);
    if (professor) {
      await professor.update({ nome, telefone, materiaId });
      res.redirect("/professores");
    } else {
      res.status(404).send("Professor não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar o professor");
  }
});

// Deletar um professor
router.post("/delete/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const professor = await Professor.findByPk(id);
    if (professor) {
      await professor.destroy();
      res.redirect("/professores");
    } else {
      res.status(404).send("Professor não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir professor");
  }
});

module.exports = router;
