const controlerExtensionProjects = require('../../controlers/extension/controlerExtensionProjects')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const modelReserachProject = require('../../models/extension/modelExtensionProjects')
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

    app.route(controlerExtensionProjects.routes().base)
        .get(middlewareAutenticacao.bearear, controlerExtensionProjects.getExtensionProjects())
        .post(middlewareAutenticacao.bearear, upload.single('proof'), modelReserachProject.validations(), controlerExtensionProjects.addExtensionProject())
        .put(middlewareAutenticacao.bearear, upload.single('proof'), modelReserachProject.validations(), controlerExtensionProjects.updateExtensionProject())
    
    app.route(controlerExtensionProjects.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerExtensionProjects.removeExtensionProject())
        
        

}