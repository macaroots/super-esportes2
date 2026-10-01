const ListRepository = require('./ListRepository');

class UsuariosRepository extends ListRepository {
    async procurarPorUsuario(usuario) {
        return this.registros.filter(p => p.usuario == usuario)[0];
    }
}
module.exports = UsuariosRepository;