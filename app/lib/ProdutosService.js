const ListService = require('./ListService');

class ProdutosService extends ListService {
    getDesconto(preco) {
        return preco - preco * 0.1;
    }
    inserir(produto) {
        produto.desconto = this.getDesconto(produto.preco);
        super.inserir(produto);
    }
    validar(produto) {
        if (!produto.nome) {
            throw new Error('Nome não pode ser em branco!');
        }
    }

}
module.exports = ProdutosService;