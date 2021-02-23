const controlerProfessionalActivities = require('../../controlers/formation/controlerProfessionalActivities')
const modelProfessionalActivities = require('../../models/formation/modelProfessionalActivities')
const multer = require('multer')
const baseStorage = require('../baseStorage')

const storage = baseStorage('formation/professionalActivities')
const upload = multer({ storage: storage })

const baseRoutes = require('../baseRoutes')

module.exports = (app) => {

    baseRoutes(app, modelProfessionalActivities, controlerProfessionalActivities, upload)

}