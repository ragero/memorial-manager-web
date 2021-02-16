
class DaoUser{

    addUser(data){
        return new Promise((resolve,reject) => {
            collection.insertOne(data)
               .then(resposta => resolve(resposta))
               .catch(erro => reject(erro))
        })
    }

    getUserByEmail(email){
        console.log('Email que tá chegando!!!', email)
        return new Promise((resolve,reject) => {
            collection.findOne({email:email}, { projection: { _id: 1, nome: 1, email: 1, senha: 1 } }, function(err, document){
                if(err){
                    reject(err)
                }
                resolve(document)
            })
        })
    }
}

module.exports = new DaoUser()