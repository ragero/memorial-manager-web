const multer = require('multer')
const fs = require('fs')

module.exports = (dirs) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = `./public/${req.user.email}/${dirs}`

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir)
        },
        filename: (req, file, cb) => {
            const data = new Date()
            cb(null, `${data.getFullYear()}-${data.getMonth()}-${data.getDay()}-${data.getHours()}-${data.getMinutes()}-${data.getSeconds()}-${file.originalname}`)
        }
    })
}