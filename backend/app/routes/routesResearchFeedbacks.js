const controlerResearchFeedbacks = require('../controlers/controlerResearchFeedback')
const middlewareAutenticacao = require('../authentication/authentication-middleware')
const modelReserachFeedback = require('../models/modelResearchFeedbacks')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/research/feedbacks`

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

    app.route(controlerResearchFeedbacks.routes().base)
        .get(middlewareAutenticacao.bearear, controlerResearchFeedbacks.getResearchFeedbacks())
        .post(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachFeedback.validations(), controlerResearchFeedbacks.addResearchFeedback())
        .put(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachFeedback.validations(), controlerResearchFeedbacks.updateResearchFeedback())
    
    app.route(controlerResearchFeedbacks.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerResearchFeedbacks.removeResearchFeedback())
        
        

}