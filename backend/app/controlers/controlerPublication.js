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
            console.log('========post===========')
            console.log(req.body)
            daoPublications.addPublication({...req.body, user: req.user, pathArquivo: req.file.path})
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    getPublications(){
        return function(req,resp){
            daoPublications.getPublications(req.user)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    removePublication(){
        return function(req,resp){
            console.log('Body=====')
            console.log(req.body)
            console.log(req.params)
            daoPublications.removePublication(req.user.email, req.params.id)
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
            console.log('========put===========')
            console.log(req.body)
            daoPublications.updatePublication(req.body)
        }
    }

    

}

module.exports = new ControlerPublication()