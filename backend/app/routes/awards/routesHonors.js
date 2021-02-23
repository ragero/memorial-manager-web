const controlerHonors = require('../../controlers/awards/controlerHonors')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const modelReserachProject = require('../../models/awards/modelHonors')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/awards/honors`

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

    app.route(controlerHonors.routes().base)
        .get(middlewareAutenticacao.bearear, controlerHonors.getHonors())
        .post(middlewareAutenticacao.bearear, upload.single('proof'), modelReserachProject.validations(), controlerHonors.addHonor())
        .put(middlewareAutenticacao.bearear, upload.single('proof'), modelReserachProject.validations(), controlerHonors.updateHonor())
    
    app.route(controlerHonors.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerHonors.removeHonor())
        
        

}