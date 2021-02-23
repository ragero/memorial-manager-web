const controlerComplementaryFormations = require('../../controlers/formation/controlerComplementaryFormations')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const modelComplementaryFormations = require('../../models/formation/modelComplementaryFormations')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/formation/complementaryFormations`

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

    app.route(controlerComplementaryFormations.routes().base)
        .get(middlewareAutenticacao.bearear, controlerComplementaryFormations.getComplementaryFormations())
        .post(middlewareAutenticacao.bearear, upload.single('proof'), modelComplementaryFormations.validations(), controlerComplementaryFormations.addComplementaryFormation())
        .put(middlewareAutenticacao.bearear, upload.single('proof'), modelComplementaryFormations.validations(), controlerComplementaryFormations.updateComplementaryFormation())
    
    app.route(controlerComplementaryFormations.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerComplementaryFormations.removeComplementaryFormation())

}