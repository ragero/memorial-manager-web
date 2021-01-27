const express = require('express')
const routePublications = require('../app/routes/routesPublication')


const app = express()
app.use(express.urlencoded({extended:true}))

routePublications(app)

module.exports = app 