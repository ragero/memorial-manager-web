const controlerUser = require('../../controlers/user/controlerUser')
const passport = require('passport')
const middlewareAutenticacao = require('../../authentication/authentication-middleware')
const userModel = require('../../models/user/modelUser')

module.exports = (app) => {

    app.route(controlerUser.routes().base)
        .get(controlerUser.getUsers())
        .post(userModel.validations(),controlerUser.addUser())
    
    app.route(controlerUser.routes().baseID)
        .get(controlerUser.getUser())
        .put(controlerUser.updateUser())
        .delete(controlerUser.removeUser())

    app.route(controlerUser.routes().login)
        .post(middlewareAutenticacao.local, controlerUser.login())

}