const express = require('express');
const router = express.Router();
const { Professor } = require('../models');

//Listar professores 
router.get("/", async (req, res) => {
    const professores = await Professor.findAll();
    res.render(
        "base",{
            title: "Listar Professores",
            view: "professores/show",
            professores,
        }
    );
});

//add nova professores - formulário
router.get("/add", async (req, res) => {
    res.render(
        "base",{
            title: "Adicionar Professores",
            view: "professores/add",
        }
    );
});

//add nova professores - no bd 
router.post("/add" , async (req, res) => {
    await Professor.create({nome: req.body.nome, telefone: req.body.telefone});
    res.redirect("/professores")
});


//edit professores - formulário
router.get("/edit/:id", async (req, res) => {
    const professor = await Professor.findByPk(req.params.id);
    res.render(
        "base", {
            title: "Editar Professor",
            view: "professores/edit",
            professor,
    });
});

//edit professores - no bd
router.post("/edit/:id", async(req, res) =>{
    await Professor.update(
        {nome: req.body.nome},
        {where:{id: req.params.id}}
    );
    res.redirect("/professores")
});

//excluir Professor
router.post("/delete/:id", async(req, res) =>{
    await Professor.destroy({where:{id: req.params.id}});
    res.redirect("/professores")
});

module.exports = router;