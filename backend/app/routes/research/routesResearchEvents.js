const controlerResearchEvents = require('../../controlers/research/controlerResearchEvents')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const modelReserachEvent = require('../../models/research/modelResearchEvents')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/research/events`

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

    app.route(controlerResearchEvents.routes().base)
        .get(middlewareAutenticacao.bearear, controlerResearchEvents.getResearchEvents())
        .post(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachEvent.validations(), controlerResearchEvents.addResearchEvent())
        .put(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachEvent.validations(), controlerResearchEvents.updateResearchEvent())
    
    app.route(controlerResearchEvents.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerResearchEvents.removeResearchEvent())
        
        

}