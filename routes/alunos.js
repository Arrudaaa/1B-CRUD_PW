const express = require('express');
const router = express.Router();
const { Aluno } = require('../models');

//Listar Alunos 
router.get("/", async (req, res) => {
    const alunos = await Aluno.findAll();
    res.render(
        "base",{
            title: "Listar Alunos",
            view: "alunos/show",
            alunos,
        }
    );
});

//add novo Aluno - formulário
router.get("/add", async (req, res) => {
    res.render(
        "base",{
            title: "Adicionar Alunos",
            view: "alunos/add",
        }
    );
});

//add novo Aluno - no bd 
router.post("/add" , async (req, res) => {
    await Aluno.create({nome: req.body.nome, ra: req.body.ra});
    res.redirect("/alunos")
});

//edit aluno - formulário
router.get("/edit/:id", async (req, res) => {
    const aluno = await Aluno.findByPk(req.params.id);
    res.render(
        "base", {
            title: "Editar Aluno",
            view: "alunos/edit",
            aluno,
    });
});

//edit aluno - no bd
router.post("/edit/:id", async(req, res) =>{
    await Aluno.update(
        {nome: req.body.nome},
        {where:{id: req.params.id}}
    );
    res.redirect("/alunos")
});

//excluir aluno
router.post("/delete/:id", async(req, res) =>{
    await Aluno.destroy({where:{id: req.params.id}});
    res.redirect("/alunos")
});

module.exports = router;