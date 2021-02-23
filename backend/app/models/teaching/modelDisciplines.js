const { check } = require('express-validator')

class DisciplineModel {

    validations() {
        return [
            [
                check('codigo').trim().isEmpty().withMessage('O código da disciplina não deve ser vazio.').trim().escape(),
                check('nome').trim().isLength({ min: 3, max: 200}).withMessage('O nome da disciplina deve ter no mínimo 3 e no máximo 200 caracteres').trim().escape(),
                check('ano').trim().isNumeric().withMessage('O ano deve ser um valor numérico.').trim().escape(),
                check('semestre').trim().isNumeric().withMessage('O semestre deve ser um valor numérico.').trim().escape(),
                check('cargaHoraria').trim().isNumeric().withMessage('A carga horária deve ser um valor numérico.').trim().escape(),
                check('tipo').trim().isEmpty().withMessage('O tipo da disciplina não deve ser vazio.').trim().escape(),
                check('instituicao').trim().isEmpty().isLength({ min: 3, max: 200}).withMessage('O nome da instituição deve ter no mínimo 3 e no máximo 200 caracteres').trim().escape(),
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

module.exports = new DisciplineModel