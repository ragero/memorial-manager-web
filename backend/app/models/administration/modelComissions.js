const { check } = require('express-validator')
class PublicationModel {

    validations() {
        return [
            [
                check('descricao').trim().isLength({ min: 3, max: 200}).withMessage('A descrição deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('funcao').trim().isLength({ min: 3, max: 200}).withMessage('A função deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('instituicao').trim().isLength({ min: 3, max: 200}).withMessage('A instituição deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('anoInicio').trim().isInt().withMessage('O ano de início deve ser um valor inteiro.'),
                check('anoFim').trim().isInt().withMessage('O ano de fim da publicação deve ser um valor inteiro.'),
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

module.exports = new PublicationModel()

