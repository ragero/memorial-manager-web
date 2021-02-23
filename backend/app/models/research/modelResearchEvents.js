const { check } = require('express-validator')

class ResearchEventModel {

    validations() {
        return [
            [
                check('nomeEvento').trim().isLength({ min: 3, max: 200}).withMessage('O nome deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('tipoEvento').trim().isLength({ min: 3}).withMessage('O tipo do evente deve ter ao menos 3 caracteres').trim().escape(),
                check('tituloTrabalho').trim().isLength({ min: 3, max: 200}).withMessage('O título do trabalho apresentado deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('ano').trim().isNumeric().withMessage('O ano deve ser um valor numérico.').trim().escape(),
                check('localEvento').trim().isURL().withMessage('A URL do grupo não é válida.').trim().escape(),
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

module.exports = new ResearchEventModel