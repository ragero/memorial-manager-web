const controlerComissions = require('../../controlers/administration/controlerComissions')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const modelReserachEvent = require('../../models/administration/modelComissions')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/administration/comissions`

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

    app.route(controlerComissions.routes().base)
        .get(middlewareAutenticacao.bearear, controlerComissions.getComissions())
        .post(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachEvent.validations(), controlerComissions.addComission())
        .put(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachEvent.validations(), controlerComissions.updateComission())
    
    app.route(controlerComissions.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerComissions.removeComission())
        
        

}