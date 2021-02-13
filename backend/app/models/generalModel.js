const { check } = require('express-validator')


generalModel = {
    nome: check('nome').trim().isLength({ min: 3, max: 200}).withMessage('O nome deve ter entre 3 e 200 caracteres.').trim().escape(),
    titulo: check('nome').trim().isLength({ min: 3, max: 200}).withMessage('O título deve ter entre 3 e 200 caracteres.').trim().escape(),
    tipoPublicacao: check('tipoPublicacao').trim().isLength({ min: 1}).withMessage('O tipo da publicação não deve ser vazio.').trim().escape(),
    autores: check('autores').trim().isLength({ min: 3, max: 200}).withMessage('O local da publicação deve ter no mínimo 3 e no máximo 200 caracteres.').trim().escape(),
    
}

module.exports = generalModel