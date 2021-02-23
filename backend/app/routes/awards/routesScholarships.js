const controlerScholarships = require('../../controlers/awards/controlerScholarships')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const modelReserachProject = require('../../models/awards/modelScholarships')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/awards/scholarships`

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

    app.route(controlerScholarships.routes().base)
        .get(middlewareAutenticacao.bearear, controlerScholarships.getScholarships())
        .post(middlewareAutenticacao.bearear, upload.single('proof'), modelReserachProject.validations(), controlerScholarships.addScholarship())
        .put(middlewareAutenticacao.bearear, upload.single('proof'), modelReserachProject.validations(), controlerScholarships.updateScholarship())
    
    app.route(controlerScholarships.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerScholarships.removeScholarship())
        
        

}