const express = require('express');
const router = express.Router();
const { Curso } = require('../models');

//Listar curso
router.get("/", async (req, res) => {
    const cursos = await Curso.findAll();
    res.render(
        "base", {
            title: "Listar Cursos",
            view: "cursos/show",
            cursos,
    });
});

//add novo curso - formulário
router.get("/add", async (req, res) => {
    res.render(
        "base", {
            title: "Adicionar Curso",
            view: "cursos/add",
    });
});

//add novo curso - no bd
router.post("/add", async(req, res) =>{
    await Curso.create({nome: req.body.nome});
    res.redirect("/cursos")
});

//edit curso - formulário
router.get("/edit/:id", async (req, res) => {
    const curso = await Curso.findByPk(req.params.id);
    res.render(
        "base", {
            title: "Editar Curso",
            view: "cursos/edit",
            curso,
    });
});


//edit curso - no bd
router.post("/edit/:id", async(req, res) =>{
    await Curso.update(
        {nome: req.body.nome},
        {where:{id: req.params.id}}
    );
    res.redirect("/cursos")
});

//excluir curso
router.post("/delete/:id", async(req, res) =>{
    await Curso.destroy({where:{id: req.params.id}});
    res.redirect("/cursos")
});

module.exports = router;