const controlerInternship = require('../../controlers/teaching/controlerInternships')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const internshipModel = require('../../models/teaching/modelInternships')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/teaching/internships`

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

    app.route(controlerInternship.routes().base)
        .get(middlewareAutenticacao.bearear, controlerInternship.getInternships())
        .post(middlewareAutenticacao.bearear, upload.single('proof'), internshipModel.validations(), controlerInternship.addInternship())
        .put(middlewareAutenticacao.bearear, upload.single('proof'), internshipModel.validations(), controlerInternship.updateInternship())
    
    app.route(controlerInternship.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerInternship.removeInternship())
        
        

}