const controlerResearchProjects = require('../controlers/controlerResearchProjects')
const middlewareAutenticacao = require('../authentication/authentication-middleware')
const modelReserachProject = require('../models/modelResearchProjects')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/research/projects`

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

    app.route(controlerResearchProjects.routes().base)
        .get(middlewareAutenticacao.bearear, controlerResearchProjects.getResearchProjects())
        .post(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachProject.validations(), controlerResearchProjects.addResearchProject())
        .put(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachProject.validations(), controlerResearchProjects.updateResearchProject())
    
    app.route(controlerResearchProjects.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerResearchProjects.removeResearchProject())
        
        

}