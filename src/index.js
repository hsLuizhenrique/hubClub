const express = require('express');
const rotas = require('./routes/rotas.js');
const app = express();

app.use(express.json());
app.use(rotas);

app.listen(3000)