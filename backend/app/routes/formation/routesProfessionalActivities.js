const controlerProfessionalActivities = require('../../controlers/research/controlerProfessionalActivities')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const modelProfessionalActivities = require('../../models/research/modelProfessionalActivities')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/formation/professionalActivities`

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

    app.route(controlerProfessionalActivities.routes().base)
        .get(middlewareAutenticacao.bearear, controlerProfessionalActivities.getProfessionalActivities())
        .post(middlewareAutenticacao.bearear, upload.single('comprovante'), modelProfessionalActivities.validations(), controlerProfessionalActivities.addResearchEvent())
        .put(middlewareAutenticacao.bearear, upload.single('comprovante'), modelProfessionalActivities.validations(), controlerProfessionalActivities.updateResearchEvent())
    
    app.route(controlerProfessionalActivities.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerProfessionalActivities.removeResearchEvent())

}