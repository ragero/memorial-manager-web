const { check } = require('express-validator')
class ProcessEvaluationModel {

    validations() {
        return [
            [
                check('tipo').trim().isLength({ min: 3, max: 200}).withMessage('O tipo da avaliação não deve ser vazio.').trim().escape(),
                check('descricao').trim().isLength({ min: 3, max: 200}).withMessage('A descricao deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('instituicao').trim().isLength({ min: 3, max: 200}).withMessage('A instituição deve ter entre 3 e 200 caracteres.').trim().escape(),
                check('ano').trim().isInt().withMessage('O ano da avaliação deve ser um valor inteiro.'),
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

module.exports = new ProcessEvaluationModel()

