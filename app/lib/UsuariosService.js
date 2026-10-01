const bcrypt = require('bcrypt');

const saltRounds = 10;

class UsuariosService {
    constructor(repository) {
        this.repository = repository;
    }
    async inserir(usuario) {
        usuario.senha = await bcrypt.hash(usuario.senha, saltRounds);
        this.repository.inserir(usuario);
    }
    async listar() {
        return this.repository.listar();
    }
    async alterar(id, registro) {
        return await this.repository.alterar(id, registro);
    }
    async ver(id) {
        return await this.repository.ver(id);
    }
    async logar(usuario) {
        let usuarioBanco = await this.repository.procurarPorUsuario(usuario.usuario);
        if (usuarioBanco && bcrypt.compare(usuario.senha, usuarioBanco.senha)) {
            return usuarioBanco;
        }
        else {
            throw new Error('Usuário não existe!');
        }
    }
}
module.exports = UsuariosService;