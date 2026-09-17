const express = require('express');

class CrudController {
    constructor(service) {
        this.service = service;
    }
    getRouter() {
        const router = express.Router();
        router.post('/', this.inserir.bind(this));
        router.get('/', this.listar.bind(this));
        router.get('/:id', this.ver.bind(this));
        router.put('/:id', this.alterar.bind(this));
        return router;
    }
    getBeanFromRequest(req) {
        return { };
    }
    async inserir(req, res) {
        let bean = this.getBeanFromRequest(req)
        try {
            await this.service.inserir(bean);
            res.status(201).json({mensagem: 'Cadastrado com sucesso', bean})
        } catch (e) {
            res.status(400).send(e.message);
        }
    }

    listar(req, res) {
        let beans = this.service.listar();
        res.json(beans);
    }
    ver(req, res) {
        let id = req.params.id;
        let bean = this.service.ver(id);
        res.json(bean);
    }
    alterar(req, res) {
        let id = req.params.id;
        let bean = {
            nome: req.body.nome,
            preco: parseFloat(req.body.preco),
            descricao: req.body.descricao,
            foto: req.body.foto,
            tamanho: req.body.tamanho
        }
        this.service.alterar(id, bean);
        res.json('bean alterado com sucesso!');
    }
}
module.exports = CrudController;