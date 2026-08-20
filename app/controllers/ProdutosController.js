const express = require('express');

class ProdutosController {
    constructor(produtosService) {
        this.produtosService = produtosService;
    }
    getRouter() {
        const router = express.Router();
        router.get('/teste', this.teste.bind(this));
        router.post('/admin/produtos', this.inserir.bind(this));
        return router;
    }
    teste(req, res) {
        let nome = req.query.nome;
        let produtos = this.produtosService.listar();
        res.render('teste', {nome, produtos});
    }
    inserir(req, res) {
        let produto = {
            nome: req.body.nome,
            preco: parseFloat(req.body.preco),
            descricao: req.body.descricao,
            foto: req.body.foto,
            tamanho: req.body.tamanho
        }
        this.produtosService.inserir(produto);
        let produtos = this.produtosService.listar();
        res.json({mensagem: 'Cadastrando nome: ' + req.body.nome, produtos})
    }
}
module.exports = ProdutosController;