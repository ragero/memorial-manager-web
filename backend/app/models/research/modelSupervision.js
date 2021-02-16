const { check } = require('express-validator')

class SupervisionModel {

    validations() {
        return [
            [
                check('tipoOrientacao').trim().isEmpty().withMessage('O tipo da orientação não deve ser vazio.').trim().escape(),
                check('tituloProjeto').trim().isLength({min: 3, max: 200}).withMessage('O título do projeto deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('nomeOrientado').trim().isLength({min: 1, max: 200}).withMessage('O nome do aluno orientado deve ter no mínimo 3 e no máximo 200 caracteres.').trim().escape(),
                check('situacao').trim().isEmpty().withMessage('A situação não deve ser vazia.').trim().escape(),
                check('anoInicio').trim().isNumeric().withMessage('O ano de início deve ser um número').trim().escape(),
                check('comprovante')
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
                    .withMessage('São aceitos apenas comprovantes em formato PDF.') 
            ]
        ]
    }

}

module.exports = new SupervisionModel()

