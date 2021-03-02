const controlerComplementaryFormations = require('../../controlers/formation/controlerComplementaryFormations')
const modelComplementaryFormations = require('../../models/formation/modelComplementaryFormations')
const multer = require('multer')
const baseStorage = require('../baseStorage')

const storage = baseStorage('formation/complementaryFormations')
const upload = multer({ storage: storage })

const baseRoutes = require('../baseRoutes')

module.exports = (app) => {

    baseRoutes(app, modelComplementaryFormations, controlerComplementaryFormations, upload)

}