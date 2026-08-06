const express = require('express');
const app = express()
const port = 3000

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/admin/produtos', (req, res) => {
    console.log('dados', req.body)
    res.send('Cadastrando nome: ' + req.body.nome)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})