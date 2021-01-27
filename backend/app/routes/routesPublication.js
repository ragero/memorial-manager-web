const controlerPublication = require('../controlers/controlerPublication')

module.exports = (app) => {

    app.route(controlerPublication.routes().base)
        .get(controlerPublication.getPublications())
        .post(controlerPublication.addPublication())
    
    app.route(controlerPublication.routes().baseID)
        .get(controlerPublication.getPublication())
        .put(controlerPublication.updatePublication())
        .delete(controlerPublication.removePublication())

}