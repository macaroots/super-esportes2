class ListService {
    registros = [];
    inserir(registro) {
        this.validar(registro);
        this.registros.push(registro);
        registro.id = this.registros.length;
    }
    validar(registro) {
    }

    listar() {
        return this.registros;
    }
    ver(id) {
        return this.registros.filter(p => p.id == id)[0];
    }
    alterar(id, registro) {
        this.validar(registro);
        let indice = this.registros.findIndex(p => p.id == id);
        let registroAntigo = this.registros[indice];
        this.registros[indice] = {...registroAntigo, ...registro};
    }
}
module.exports = ListService;