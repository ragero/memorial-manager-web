const daoUsers = require('../daos/daoUser')


class ControlerUser{

    routes(){
        return {
            base: '/app/users',
            baseID: '/app/users/:id'
        }    
    }

    addUser(){
        return function(req,resp){
            console.log("I'm here baby")
            daoUsers.addUser(req.body)
                .then(resp.send('Usuário Acidionado com Sucesso'))
                .catch(resp.send('Houve um erro ao cadastrar o usuário'))
        }
    }

    getUsers(){
        return function(req,resp){
            resp.send('Get users')
        }
    }


    getUser(){
        return function(req,resp){
            resp.send('Get users')
        }
    }

    updateUser(){
        return function(req,resp){
            resp.send('Update users')
        }
    }

    removeUser(){
        return function(req,resp){
            resp.send('Remove users')
        }
    }

}

module.exports = new ControlerUser()