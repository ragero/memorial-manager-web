const { check } = require('express-validator');
const modelEventOrganizations = require('../extension/modelEventOrganizations');

class ComplementaryFormationsModel{
     validations() {
        return [
            [
                check('curso').trim().isLength({ min: 3, max: 200}).withMessage('O curso deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('instituicacao').trim().isLength({ min: 3, max: 200}).withMessage('O nome da empresa/instituição deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('cargaHoraria').trim().isNumeric().withMessage('O ano de inicio deve ser um valor inteiro.'),
                check('anoConclusao').trim().isInt().withMessage('O ano de inicio deve ser um valor inteiro.'),
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

module.export = new ComplementaryFormationsModel()
