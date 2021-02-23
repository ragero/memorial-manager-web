const controlerAcademicFormations = require('../../controlers/formation/controlerAcademicFormations')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const modelAcademicFormations = require('../../models/formation/modelAcademicFormations')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/formation/academicFormations`

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {recursive : true});
        }
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        const data = new Date()
        cb(null, `${data.getFullYear()}-${data.getMonth()}-${data.getDay()}-${data.getHours()}-${data.getMinutes()}-${data.getSeconds()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

module.exports = (app) => {

    app.route(controlerAcademicFormations.routes().base)
        .get(middlewareAutenticacao.bearear, controlerAcademicFormations.getAcademicFormations())
        .post(middlewareAutenticacao.bearear, upload.single('proof'), modelAcademicFormations.validations(), controlerAcademicFormations.addAcademicFormation())
        .put(middlewareAutenticacao.bearear, upload.single('proof'), modelAcademicFormations.validations(), controlerAcademicFormations.updateAcademicFormation())
    
    app.route(controlerAcademicFormations.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerAcademicFormations.removeAcademicFormation())

}