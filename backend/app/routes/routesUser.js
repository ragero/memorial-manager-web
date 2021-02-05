const controlerUser = require('../controlers/controlerUser')
const passport = require('passport')
const middlewareAutenticacao = require('../authentication/authentication-middleware')



module.exports = (app) => {

    app.route(controlerUser.routes().base)
        .get(controlerUser.getUsers())
        .post(controlerUser.addUser())
    
    app.route(controlerUser.routes().baseID)
        .get(controlerUser.getUser())
        .put(controlerUser.updateUser())
        .delete(controlerUser.removeUser())

    app.route(controlerUser.routes().login)
        .post(middlewareAutenticacao.local, controlerUser.login())

}