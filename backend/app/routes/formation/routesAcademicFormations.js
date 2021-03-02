const controlerAcademicFormations = require('../../controlers/formation/controlerAcademicFormations')
const modelAcademicFormations = require('../../models/formation/modelAcademicFormations')
const multer = require('multer')
const baseStorage = require('../baseStorage')

const storage = baseStorage('formation/academicFormations')
const upload = multer({ storage: storage })

const baseRoutes = require('../baseRoutes')

module.exports = (app) => {

    baseRoutes(app, modelAcademicFormations, controlerAcademicFormations, upload)

}