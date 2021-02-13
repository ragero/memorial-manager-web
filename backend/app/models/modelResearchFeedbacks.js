const { check } = require('express-validator')

class ResearchProjectModel {

    validations() {
        return [
            [
                check('tipo').trim().isEmpty().withMessage('O tipo deve ser diferente de vazio.').trim().escape(),
                check('titulo').trim().isLength({ min: 3, max: 200}).withMessage('O título deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('quantidade').trim().isNumeric().withMessage('A quantidade deve ser um valor numérico.').trim().escape(),
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

module.exports = new ResearchProjectModel()

