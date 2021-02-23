const middlewareAutenticacao = require('../authentication/authentication-middleware')

module.exports = (app, model, controler, upload) => {

    app.route(controler.routes().base)
        .get(middlewareAutenticacao.bearear, controler.getAll())
        .post(middlewareAutenticacao.bearear, upload.single('proof'), model.validations(), controler.add())
        .put(middlewareAutenticacao.bearear, upload.single('proof'), model.validations(), controler.update())
    
    app.route(controler.routes().baseID)
        .delete(middlewareAutenticacao.bearear, controler.remove())

}