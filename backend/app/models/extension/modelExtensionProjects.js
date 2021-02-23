const { check } = require('express-validator')

class ExtensionProjectModel {

    validations() {
        return [
            [
                check('titulo').trim().isLength({ min: 3, max: 200}).withMessage('O título deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('descricao').trim().isLength({ min: 3}).withMessage('A descrição deve ter no mínimo 3 caracteres').trim().escape(),
                check('anoInicio').trim().isInt().withMessage('O ano da publicação deve ser um valor inteiro.'),
                check('anoFim').trim().isInt().withMessage('O ano da publicação deve ser um valor inteiro.'),
                check('instituicao').trim().isLength({ min: 3}).withMessage('O nome da instituição de execução deve ter no mínimo 3 caracteres.').trim().escape(),
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

