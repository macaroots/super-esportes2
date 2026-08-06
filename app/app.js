const http = require('node:http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url == '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('<h1>Inicial!<h1>\n');
    } else if (req.url == '/detalhes')  {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Detalhes!<h1>\n');
    } else {
        res.statusCode = 404;
        res.end('Não encontrado!\n');
        
    }
});

/*
Função
function atenderRequisicao(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World3!\n');
}

Função anônima
(req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World3!\n');
}
*/

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
