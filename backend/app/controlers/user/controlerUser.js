const daoUsers = require('../../daos/user/daoUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

class ControlerUser{

    

    routes(){
        return {
            base: '/app/users',
            baseID: '/app/users/:id',
            login: '/app/users/login',
            logout: '/app/users/logout'
        }    
    }

    

    criaTokenJWT(usuario){
        console.log('Criando o JWT =================')
        console.log(usuario)
        const payload = {
            id: usuario._id,
            nome: usuario.nome,
            email: usuario.email
        }
        const token = jwt.sign(payload, process.env.CHAVE_JWT)

        return token 
    }

    async _gerarSenhaHash(senha){
        const custo = 12
        let senhaHash = ''
        senhaHash = await bcrypt.hash(senha, custo)
        return senhaHash
    }

    addUser(){
        return async (req,resp) =>{
            const errosVal = validationResult(req).array();
            console.log(errosVal)
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {                        
                req.body.senha = await this._gerarSenhaHash(req.body.senha)
                daoUsers.addUser(req.body)
                    .then((resultado) => {
                        console.log('RESULTADO ================================')
                        console.log(resultado)
                        resp.json({status:'sucesso', msg: 'Usuário cadastrado com sucesso'})
                    })
                    .catch((erro) => {
                        console.log('ERRO ================================')
                        console.log(erro)
                        resp.json({status:'erro', msg: 'E-mail já cadastrado no sistema'})
                    })
            }
        }
    }

    login(){
        return (req, resp) => {
            console.log('LOGIN ================================================')
            console.log(req.user)
            const token = this.criaTokenJWT(req.user)
            resp.setHeader('Authorization', token)
            console.log(req.user)
            const resposta = {user: {id: req.user._id, email:req.user.email, nome:req.user.nome}, token: token}
            console.log(resposta)
            resp.json(resposta)
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