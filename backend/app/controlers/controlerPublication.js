const daoPublications = require('../daos/daoPublications')


class ControlerPublication{

    routes(){
        return {
            base: '/publications',
            baseID: `/publications/:id`
        }    
    }

    addPublication(){
        return function(req,resp){
            daoPublications.addPublication(req.body)
        }
    }

    getPublications(){
        return function(req,resp){
            resp.send('Get publications')
        }
    }

    getPublication(){
        return function(req,resp){
            resp.send('Get publications')
        }
    }

    updatePublication(){
        return function(req,resp){
            resp.send('Update publications')
        }
    }

    removePublication(){
        return function(req,resp){
            resp.send('Remove publications')
        }
    }

}

module.exports = new ControlerPublication()