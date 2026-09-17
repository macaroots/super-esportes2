const CrudController = require('./CrudController');

class UsuariosController extends CrudController {

    getBeanFromRequest(req) {
        return {
            usuario: req.body.usuario,
            senha: req.body.senha,
        };
    }
}
module.exports = UsuariosController;