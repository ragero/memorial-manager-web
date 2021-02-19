const controlerEventOrganizations = require('../../controlers/extension/controlerEventOrganizations')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const modelReserachProject = require('../../models/extension/modelEventOrganizations')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/extension/eventOrganizations`

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

    app.route(controlerEventOrganizations.routes().base)
        .get(middlewareAutenticacao.bearear, controlerEventOrganizations.getEventOrganizations())
        .post(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachProject.validations(), controlerEventOrganizations.addEventOrganization())
        .put(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachProject.validations(), controlerEventOrganizations.updateEventOrganization())
    
    app.route(controlerEventOrganizations.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerEventOrganizations.removeEventOrganization())
        
        

}