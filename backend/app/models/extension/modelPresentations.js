const { check } = require('express-validator')

class ExtensionProjectModel {

    validations() {
        return [
            [
                check('titulo').trim().isLength({ min: 3, max: 200}).withMessage('O título deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('evento').trim().isLength({ min: 3, max: 200}).withMessage('O nome do evento deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('local').trim().isLength({ min: 3, max: 200}).withMessage('O local do evento deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('ano').trim().isInt().withMessage('O ano da publicação deve ser um valor inteiro.'),
                check('proof')
                    .custom((value, { req }) => {
                        if(req.file !== undefined){
                            if (req.file.mimetype.startsWith('application/pdf')) {
                                return true; 
                            } else {
                                return false; 
                            }
                        }else{ 
                            req.file = {path: ''}
                            return true
                        }
                    })
                    .withMessage('São aceitos apenas proofs em formato PDF.') 
            ]
        ]
    }

}

module.exports = new ExtensionProjectModel()

