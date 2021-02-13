const controlerPublication = require('../controlers/controlerPublication')
const middlewareAutenticacao = require('../authentication/authentication-middleware')
const userModel = require('../models/modelPublication')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/research/publications`

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

    app.route(controlerPublication.routes().base)
        .get(middlewareAutenticacao.bearear, controlerPublication.getPublications())
        .post(middlewareAutenticacao.bearear, upload.single('comprovante'), userModel.validations(), controlerPublication.addPublication())
        .put(middlewareAutenticacao.bearear, upload.single('comprovante'), userModel.validations(), controlerPublication.updatePublication())
    
    app.route(controlerPublication.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerPublication.removePublication())
        
        

}