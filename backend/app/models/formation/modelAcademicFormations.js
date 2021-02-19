const { check } = require('express-validator')

class AcademicFormationsModel {

    validations() {
        return [
            [
                check('titulacao').trim().isLength({ min: 3, max: 200}).withMessage('O titulação deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('instituicacao').trim().isLength({ min: 3, max: 200}).withMessage('O nome da empresa/instituição deve ter entre 3 e 200 caracteres.').trim().escape(),
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

module.exports = new AcademicFormationsModel()

