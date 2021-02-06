const controlerPublication = require('../controlers/controlerPublication')
const middlewareAutenticacao = require('../authentication/authentication-middleware')
const fs = require('fs')
const multer = require('multer')
const { Console } = require('console')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/publications`

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        const data = new Date()
        cb(null, `${data.getFullYear()}-${data.getMonth()}-${data.getDay()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

module.exports = (app) => {

    app.route(controlerPublication.routes().base)
        .get(middlewareAutenticacao.bearear, controlerPublication.getPublications())
        .post(middlewareAutenticacao.bearear, upload.single('comprovante'), controlerPublication.addPublication())
        .put(middlewareAutenticacao.bearear, upload.single('comprovante'), controlerPublication.updatePublication())
    
    app.route(controlerPublication.routes().baseID)
        .get(middlewareAutenticacao.bearear, controlerPublication.getPublication())
        .delete(middlewareAutenticacao.bearear, controlerPublication.removePublication())
        
        

}