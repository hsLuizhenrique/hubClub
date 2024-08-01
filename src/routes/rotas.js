const express = require('express');
const rotas = express();

const cadastrarUsuario = require('../controllers/cadastrar-usuarios')


rotas.post('/usuarios', cadastrarUsuario)

module.exports = rotas