class ProdutosService {
    produtos = [];
    getDesconto(preco) {
        return preco - preco * 0.1;
    }
    inserir(produto) {
        produto.desconto = this.getDesconto(produto.preco);
        this.produtos.push(produto);
    }
    listar() {
        return this.produtos;
    }
}
module.exports = ProdutosService;