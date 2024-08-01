const express = require('express');
const knex = require('../conexao');
const bcrypt = require('bcrypt')

const validarEmail = async (email) => {
    const validador = await knex('usuarios')
        .select("email")
        .where('email', email)
        .first();

    return !!validador
}

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const user = { nome, email, senha: senhaCriptografada }

        const camposObrigatorios = ["nome", "email", "senha"]
        for (const campo of camposObrigatorios) {
            if (!req.body[campo]) {
                return res.status(400).json({ mensagem: `O campo ${campo} não foi informado` });
            };
        }

        if (await validarEmail(email)) {
            return res.status(400).json({ mensagem: 'Ja existe um usuario com o email cadastrado' })
        }


        const cadastro = await knex('usuarios').insert(user).returning(['nome', 'email']);
        return res.status(201).json(cadastro);


    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

}

module.exports = cadastrarUsuario; 