const { check } = require('express-validator')

class UserModel {



    validations() {
        return [
            [
                check('nome').trim().isLength({ min: 3, max: 100}).withMessage('O nome deve ter entre 3 e 45 caracteres.').trim().escape(),
                check('email').isEmail().withMessage('Formato de e-mail inválido').trim(),
                check('senha',).trim().isLength({ min: 3, max: 15 }).withMessage('A senha deve ter entre 6 e 15 caracteres.'),
            ]
        ]
    }



}

module.exports = new UserModel()

