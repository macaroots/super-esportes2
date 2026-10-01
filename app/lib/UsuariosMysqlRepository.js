let mysql = require('mysql2/promise');

class UsuariosMysqlRepository {
    constructor(config) {
        this.config = config;
    }
    
    conectar() {
        return mysql.createConnection(this.config);
    }

    async inserir(registro) {
            await using connection = await this.conectar();
        
            const [results] = await connection.query(
                'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)',
                [registro.usuario, registro.senha]
            );
    }
    async listar() {
        {
            await using connection = await this.conectar()
        
            const [results] = await connection.query(
                'SELECT * FROM usuarios'
            );
            return results;
        }
    }
    async ver(id) {
    }
    async alterar(id, registro) {
    }
    async procurarPorUsuario(nomeUsuario) {
        {
            await using connection = await this.conectar()
        
            const [results] = await connection.query(
                'SELECT * FROM usuarios WHERE usuario = ?',
                [nomeUsuario]
            );
            return results[0];
        }
    }

}
module.exports = UsuariosMysqlRepository;