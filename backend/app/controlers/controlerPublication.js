const daoPublications = require('../daos/daoPublications')


class ControlerPublication{

    routes(){
        return {
            base: '/app/publications',
            baseID: `/app/publications/:id`
        }    
    }

    addPublication(){
        return function(req,resp){
            daoPublications.addPublication({...req.body, user: req.user, pathArquivo: req.file.path})
        }
    }

    getPublications(){
        return function(req,resp){
            daoPublications.getPublications(req.user)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
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