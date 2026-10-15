const CrudController = require('./CrudController');

class UsuariosController extends CrudController {
    getRouter() {
        // REST para CSR (Client Side Rendering)
        let router = super.getRouter();
        
        // SSR (Server Side Rendering)
        router.get('/gerencia/ssr', this.gerencia.bind(this));

        return router;
    }
    getBeanFromRequest(req) {
        return {
            usuario: req.body.usuario,
            senha: req.body.senha,
        };
    }

    async gerencia(req, res) {
        let usuarios = await this.service.listar();
        res.render('admin/usuarios', {usuarios});
    }
}
module.exports = UsuariosController;