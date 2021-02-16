const { check } = require('express-validator')

class ResearchGroupModel {

    validations() {
        return [
            [
                check('nome').trim().isLength({ min: 3, max: 200}).withMessage('O nome deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('instituicao').trim().isLength({ min: 3, max: 200}).withMessage('O instituição deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('autores').trim().isLength({ min: 3, max: 200}).withMessage('A publicação deve ter no mínimo um autor cujo nome deve ter ao menos 3 caracteres.').trim().escape(),
                check('url').trim().isURL().withMessage('A URL do grupo não é válida.').trim().escape(),
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

module.exports = new ResearchGroupModel