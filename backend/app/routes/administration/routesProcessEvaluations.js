const controlerProcessEvaluations = require('../../controlers/administration/controlerProcessEvaluations')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const modelReserachEvent = require('../../models/administration/modelProcessEvaluations')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/administration/evaluations`

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

    app.route(controlerProcessEvaluations.routes().base)
        .get(middlewareAutenticacao.bearear, controlerProcessEvaluations.getProcessEvaluations())
        .post(middlewareAutenticacao.bearear, upload.single('proof'), modelReserachEvent.validations(), controlerProcessEvaluations.addProcessEvaluation())
        .put(middlewareAutenticacao.bearear, upload.single('proof'), modelReserachEvent.validations(), controlerProcessEvaluations.updateProcessEvaluation())
    
    app.route(controlerProcessEvaluations.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerProcessEvaluations.removeProcessEvaluation())
        
        

}