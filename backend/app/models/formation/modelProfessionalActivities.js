const { check } = require('express-validator')

class ProfessionalActivitiesModel {

    validations() {
        return [
            [
                check('role').trim().isLength({ min: 3, max: 200}).withMessage('O cargo deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('institution').trim().isLength({ min: 3, max: 200}).withMessage('O nome da empresa/instituição deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('yearBegin').trim().isInt().withMessage('O ano de inicio deve ser um valor inteiro.'),
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

module.exports = new ProfessionalActivitiesModel()

