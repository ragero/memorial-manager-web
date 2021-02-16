const controlerDiscipline = require('../../controlers/teaching/controlerDisciplines')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const disciplineModel = require('../../models/teatching/modelDisciplines')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/teaching/disciplines`

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

    app.route(controlerDiscipline.routes().base)
        .get(middlewareAutenticacao.bearear, controlerDiscipline.getDisciplines())
        .post(middlewareAutenticacao.bearear, upload.single('comprovante'), disciplineModel.validations(), controlerDiscipline.addDiscipline())
        .put(middlewareAutenticacao.bearear, upload.single('comprovante'), disciplineModel.validations(), controlerDiscipline.updateDiscipline())
    
    app.route(controlerDiscipline.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerDiscipline.removeDiscipline())
        
        

}