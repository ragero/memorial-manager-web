const { check } = require('express-validator')
const generalModel = require('./generalModel')
class PublicationModel {

    validations() {
        return [
            [
                check('titulo').trim().isLength({ min: 3, max: 200}).withMessage('O título deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('tipoPublicacao').trim().isLength({ min: 1}).withMessage('O tipo da publicação não deve ser vazio.').trim().escape(),
                check('autores').trim().isLength({ min: 3}).withMessage('A publicacao deve ter ao menos um autor.').trim().escape(),
                check('qualis').trim().isLength({ min: 2, max: 2}).withMessage('O Qualis da publicação deve ser informado.').trim().escape(),
                check('anoPublicacao').trim().isInt().withMessage('O ano da publicação deve ser um valor inteiro.'),
                check('paginaInicial').trim().isInt().withMessage('A página inicial da publicação deve ser um valor inteiro.'),
                check('paginaFinal').trim().isInt().withMessage('A página final da publicação deve ser um valor inteiro.'),
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

module.exports = new PublicationModel()

