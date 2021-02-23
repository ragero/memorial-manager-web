const controlerProfessionalActivities = require('../../controlers/formation/controlerProfessionalActivities')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const modelProfessionalActivities = require('../../models/formation/modelProfessionalActivities')
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
        .post(middlewareAutenticacao.bearear, upload.single('proof'), modelProfessionalActivities.validations(), controlerProfessionalActivities.addProfessionalActivity())
        .put(middlewareAutenticacao.bearear, upload.single('proof'), modelProfessionalActivities.validations(), controlerProfessionalActivities.updateProfessionalActivity())
    
    app.route(controlerProfessionalActivities.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerProfessionalActivities.removeProfessionalActivity())

}