const controlerEvaluation = require('../../controlers/teaching/controlerEvaluations')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const evaluationModel = require('../../models/teaching/modelEvaluations')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/teaching/evaluations`

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

    app.route(controlerEvaluation.routes().base)
        .get(middlewareAutenticacao.bearear, controlerEvaluation.getEvaluations())
        .post(middlewareAutenticacao.bearear, upload.single('proof'), evaluationModel.validations(), controlerEvaluation.addEvaluation())
        .put(middlewareAutenticacao.bearear, upload.single('proof'), evaluationModel.validations(), controlerEvaluation.updateEvaluation())
    
    app.route(controlerEvaluation.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerEvaluation.removeEvaluation())

}