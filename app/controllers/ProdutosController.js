const express = require('express');
const CrudController = require('./CrudController');

class ProdutosController extends CrudController {
    getRouter() {
        // REST para CSR (Client Side Rendering)
        let router = super.getRouter();
        
        // SSR (Server Side Rendering)
        router.get('/teste', this.teste.bind(this));

        return router;
    }
    teste(req, res) {
        let nome = req.query.nome;
        let produtos = this.service.listar();
        res.render('teste', {nome, produtos});
    }
    
    getBeanFromRequest(req) {
        let produto = {
            nome: req.body.nome,
            preco: parseFloat(req.body.preco),
            descricao: req.body.descricao,
            foto: req.body.foto,
            tamanho: req.body.tamanho
        }
        return produto;
    }
    listar(req, res) {
        let produtos = this.service.listar();
        if (req.header('accept') == 'text/html') {
            res.render('teste', {nome: 'mundo', produtos});
        } else {
            res.json(produtos);
        }
    }
}
module.exports = ProdutosController;