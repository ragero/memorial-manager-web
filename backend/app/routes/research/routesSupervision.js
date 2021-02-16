const controlerSupervision = require('../../controlers/research/controlerSupervision')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const supervisionModel = require('../../models/research/modelSupervision')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/research/supervisions`

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

    app.route(controlerSupervision.routes().base)
        .get(middlewareAutenticacao.bearear, controlerSupervision.getSupervisions())
        .post(middlewareAutenticacao.bearear, upload.single('comprovante'), supervisionModel.validations(), controlerSupervision.addSupervision())
        .put(middlewareAutenticacao.bearear, upload.single('comprovante'), supervisionModel.validations(), controlerSupervision.updateSupervision())
    
    app.route(controlerSupervision.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerSupervision.removeSupervision())
        
        

}