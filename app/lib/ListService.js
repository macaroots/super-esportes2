class ListService {
    registros = [];
    async inserir(registro) {
        this.validar(registro);
        this.registros.push(registro);
        registro.id = this.registros.length;
    }
    validar(registro) {
    }

    async listar() {
        return this.registros;
    }
    async ver(id) {
        return this.registros.filter(p => p.id == id)[0];
    }
    async alterar(id, registro) {
        this.validar(registro);
        let indice = this.registros.findIndex(p => p.id == id);
        let registroAntigo = this.registros[indice];
        this.registros[indice] = {...registroAntigo, ...registro};
    }
}
module.exports = ListService;