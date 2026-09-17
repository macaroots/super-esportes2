const express = require('express');
const app = express()
const port = 3000
const ProdutosService = require('./lib/ProdutosService');
const UsuariosService = require('./lib/UsuariosService');
const ProdutosController = require('./controllers/ProdutosController');
const UsuariosController = require('./controllers/UsuariosController');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

const produtosService = new ProdutosService();
const usuariosService = new UsuariosService();
const produtosController = new ProdutosController(produtosService);
const usuariosController = new UsuariosController(usuariosService);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

let autenticar = (req, res, next) => {
  let token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.SEGREDO_JWT, function(err, decoded) {
      if (err) {
        res.status(403).send('Não autenticado');
      }
      else {
        req.usuario = decoded.usuario;
        next();
      }
    });
  }
  else {
    res.status(403).send('Não autenticado');
  }
};

app.use('/admin/produtos', autenticar, produtosController.getRouter());
app.use('/admin/usuarios', usuariosController.getRouter());

app.get('/teste', autenticar, (req, res) => {
  res.json({mensagem: 'autenticado', usuario: req.usuario})
});

app.post('/login', async (req, res) => {
  let usuario = {
    'usuario': req.body.usuario,
    'senha': req.body.senha,
  };
  try {
    let usuarioLogado = await usuariosService.logar(usuario);
    let token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      usuario: usuarioLogado
    }, process.env.SEGREDO_JWT);

    res.cookie('token', token, {
      maxAge: 900000, 
      httpOnly: true, 
      //secure: true, 
      sameSite: true 
    });
    res.json({token, mensagem: 'logado'});
  } catch (e) {
    res.status(403).json('Não autenticado:' + e.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})