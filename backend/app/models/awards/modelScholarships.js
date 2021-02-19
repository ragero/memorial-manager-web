const { check } = require('express-validator')

class ScholarshipsModel {

    validations() {
        return [
            [
                check('descricao').trim().isLength({ min: 3, max: 200}).withMessage('A descrição do prêmio deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('instituicao').trim().isLength({ min: 3, max: 200}).withMessage('O nome da fornecedora da concessão deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('ano').trim().isInt().withMessage('O ano da publicação deve ser um valor inteiro.'),
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

module.exports = new ScholarshipsModel()

