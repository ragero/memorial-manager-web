const controlerPresentations = require('../../controlers/extension/controlerPresentations')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const modelReserachProject = require('../../models/Extension/modelPresentations')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/extension/projects`

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

    app.route(controlerPresentations.routes().base)
        .get(middlewareAutenticacao.bearear, controlerPresentations.getPresentations())
        .post(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachProject.validations(), controlerPresentations.addPresentation())
        .put(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachProject.validations(), controlerPresentations.updatePresentation())
    
    app.route(controlerPresentations.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerPresentations.removePresentation())
        
        

}