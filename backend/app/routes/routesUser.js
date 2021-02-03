const controlerUser = require('../controlers/controlerUser')

module.exports = (app) => {

    app.route(controlerUser.routes().base)
        .get(controlerUser.getUsers())
        .post(controlerUser.addUser())
    
    app.route(controlerUser.routes().baseID)
        .get(controlerUser.getUser())
        .put(controlerUser.updateUser())
        .delete(controlerUser.removeUser())

}