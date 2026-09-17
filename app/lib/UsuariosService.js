const ListService = require('./ListService');
const bcrypt = require('bcrypt');

const saltRounds = 10;

class UsuariosService extends ListService {
    async inserir(usuario) {
        usuario.senha = await bcrypt.hash(usuario.senha, saltRounds);
        super.inserir(usuario);
    }
    async procurarPorUsuario(usuario) {
        return this.registros.filter(p => p.usuario == usuario)[0];
    }
    async logar(usuario) {
        let usuarioBanco = await this.procurarPorUsuario(usuario.usuario);
        if (usuarioBanco && bcrypt.compare(usuario.senha, usuarioBanco.senha)) {
            return usuarioBanco;
        }
        else {
            throw new Error('Usuário não existe!');
        }
    }
}
module.exports = UsuariosService;