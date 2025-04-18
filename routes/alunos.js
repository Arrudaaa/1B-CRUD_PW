const express = require('express');
const router = express.Router();
const { Aluno , Curso } = require('../models');

// Mostrar todos os alunos
router.get("/",  async (req, res) => {
  try {
    const alunos = await Aluno.findAll({
      include: [{ model: Curso, as: "Curso" }],
    });
    res.render("base", {
      title: "Alunos",
      view: "alunos/show",
      alunos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar alunos");
  }
});

// Formulário para adicionar um novo aluno
router.get("/add",  async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.render("base", {
      title: "Add aluno",
      view: "alunos/add",
      cursos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar cursos");
  }
});

// Adicionar um novo aluno
router.post("/add",  async (req, res) => {
  try {
    const { nome, ra, cursoId } = req.body;
    await Aluno.create({
      nome,
      ra,
      cursoId,
    });
    res.redirect("/alunos");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao adicionar aluno");
  }
});

// Formulário para editar um aluno
router.get("/edit/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await aluno.findByPk(id, {
      include: [{ model: Curso, as: "Curso" }],
    });
    const cursos = await Curso.findAll();
    if (aluno) {
      res.render("base", {
        title: "Edit aluno",
        view: "alunos/edit",
        aluno,
        cursos,
      });
    } else {
      res.status(404).send("aluno não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar aluno");
  }
});

// Atualizar um aluno
router.post("/edit/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, ra, cursoId } = req.body;
    const aluno = await aluno.findByPk(id);
    if (aluno) {
      await aluno.update({ nome, ra, cursoId });
      res.redirect("/alunos");
    } else {
      res.status(404).send("Aluno não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar o aluno");
  }
});

// Deletar um aluno
router.post("/delete/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await aluno.findByPk(id);
    if (aluno) {
      await aluno.destroy();
      res.redirect("/alunos");
    } else {
      res.status(404).send("Aluno não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir aluno");
  }
});

module.exports = router;

