
const { check } = require('express-validator')

module.exports = {
    'course': check('course').trim().isLength({ min: 3, max: 200}).withMessage('O curso deve ter entre 3 e 200 caracteres.').trim().escape(),
    'degree': check('degree').trim().isLength({ min: 3, max: 200}).withMessage('O titulação deve ter entre 3 e 200 caracteres.').trim().escape(),
    'institution': check('institution').trim().isLength({ min: 3, max: 200 }).withMessage('O nome da empresa/instituição deve ter entre 3 e 200 caracteres.').trim().escape(),
    'role': check('role').trim().isLength({ min: 3, max: 200 }).withMessage('O cargo deve ter entre 3 e 200 caracteres.').trim().escape(),
    'workload': check('workload').trim().isNumeric().withMessage('A carga de trabalho deve ser um valor numérico.'),
    'type': check('tpe').trim().isLength({ min: 1}).withMessage('O campo tipo não deve ser vazio.').trim().escape(),
    'yearBegin': check('yearBegin').trim().isInt().withMessage('O ano de inicio deve ser um valor inteiro.'),
    'yearEnd': check('yearEnd').trim().isInt().withMessage('O ano de término deve ser um valor inteiro.'),
    
    'proof': check('proof')
        .custom((value, { req }) => {
            if (req.file !== undefined) {
                if (req.file.mimetype.startsWith('application/pdf')) {
                    return true;
                } else {
                    return false;
                }
            } else {
                req.file = { path: '' }
                return true
            }
        })
        .withMessage('São aceitos apenas comprovantes em formato PDF.')
}
