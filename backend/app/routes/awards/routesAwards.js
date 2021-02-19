const controlerAwards = require('../../controlers/extension/controlerAwards')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const modelReserachProject = require('../../models/Extension/modelAwards')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/awards/awards`

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

    app.route(controlerAwards.routes().base)
        .get(middlewareAutenticacao.bearear, controlerAwards.getAwards())
        .post(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachProject.validations(), controlerAwards.addAward())
        .put(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachProject.validations(), controlerAwards.updateAward())
    
    app.route(controlerAwards.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerAwards.removeAward())
        
        

}