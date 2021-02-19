const controlerBoards = require('../../controlers/administration/controlerBoards')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const modelReserachEvent = require('../../models/administration/modelBoards')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.user.email}/administration/Boards`

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

    app.route(controlerBoards.routes().base)
        .get(middlewareAutenticacao.bearear, controlerBoards.getBoards())
        .post(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachEvent.validations(), controlerBoards.addBoard())
        .put(middlewareAutenticacao.bearear, upload.single('comprovante'), modelReserachEvent.validations(), controlerBoards.updateBoard())
    
    app.route(controlerBoards.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controlerBoards.removeBoard())

}