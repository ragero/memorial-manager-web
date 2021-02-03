
class DaoUser{

    addUser(data){
        console.log(data)
        return new Promise((resolve,reject) => {
            collection.insertOne({data})
               .then(resposta => resolve(resposta))
               .catch(erro => reject(erro))
        })
    }

}

module.exports = new DaoUser()