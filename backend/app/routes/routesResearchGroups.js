const controlerResearchGroups = require('../controlers/controlerResearchGroups')
const middlewareAutenticacao = require('../authentication/authentication-middleware')
const modelReserachGroup = require('../models/modelResearchGroups')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/research/groups`

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

    app.route(controlerResearchGroups.routes().base)
        .get(middlewareAutenticacao.bearear, controlerResearchGroups.getResearchGroups())
        .post(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachGroup.validations(), controlerResearchGroups.addResearchGroup())
        .put(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachGroup.validations(), controlerResearchGroups.updateResearchGroup())
    
    app.route(controlerResearchGroups.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerResearchGroups.removeResearchGroup())
        
        

}