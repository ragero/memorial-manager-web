const express = require('express')
const cors = require('cors')
const {
    routePublications,
    routeResearchProjects,
    routeResearchGroups,
    routeResearchFeedbacks,
    routeSupervision,
    routeResearchEvents } = require('../app/routes/research')
const {routeUsers} = require('../app/routes/user')
const {
    routeDisciplines,
    routeInternships,
    routeProcessEvaluations} = require('../app/routes/teatching')
const {
    routeComissions,
    routeBoards,
    routeEvaluations} = require('../app/routes/administration')
const {
    routeExtensionProjects,
    routePresentations,
    routeEventOrganization} = require('../app/routes/extension')

const authenticationStrategy = require('../app/authentication/authentication-strategy')

const app = express()
app.use('/public', express.static('./public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use((req, resp, next) => {
    console.log('Body ====================================')
    console.log(req.body)
    console.log('Paramsssss ====================================')
    console.log(req.params)
    console.log('Header ====================================')
    console.log(req.headers)
    next()
})

routePublications(app)
routeUsers(app)
routeResearchProjects(app)
routeResearchGroups(app)
routeResearchFeedbacks(app)
routeSupervision(app)
routeResearchEvents(app)
routeDisciplines(app)
routeInternships(app)
routeEvaluations(app)
routeComissions(app)
routeBoards(app)
routeProcessEvaluations(app)
routeExtensionProjects(app)
routePresentations(app)
routeEventOrganization(app)

module.exports = app 