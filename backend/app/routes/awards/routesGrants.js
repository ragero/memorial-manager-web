const controlerGrants = require('../../controlers/awards/controlerGrants')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const modelReserachProject = require('../../models/awards/modelGrants')
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

    app.route(controlerGrants.routes().base)
        .get(middlewareAutenticacao.bearear, controlerGrants.getGrants())
        .post(middlewareAutenticacao.bearear, upload.single('proof'), modelReserachProject.validations(), controlerGrants.addGrant())
        .put(middlewareAutenticacao.bearear, upload.single('proof'), modelReserachProject.validations(), controlerGrants.updateGrant())
    
    app.route(controlerGrants.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerGrants.removeGrant())
        
        

}