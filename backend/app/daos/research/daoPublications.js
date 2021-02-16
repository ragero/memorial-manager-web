const { ObjectID } = require("mongodb")

class DaoPublications {

    processAuthors(authors) {
        const finalAuthors = authors.split(',').filter((author) => {
            if (author.trim() != '') {
                return true
            } else {
                return false
            }
        })
        return finalAuthors
    }

    preprocessData(data){
        data.anoPublicacao = Number(data.anoPublicacao)
        data.paginaInicial = Number(data.paginaInicial)
        data.paginaFinal = Number(data.paginaFinal)
        return data
    }

    getPublication(user, idPublication){
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: {'email':user.email}
                },
                {
                    $project : {publicacoes:1}
                },
                {
                    $unwind: "$publicacoes"
                },
                {
                    $match: {'publicacoes._id': ObjectID(idPublication)}
                }
            ]).toArray(function (err, result) {
                if(err){
                    reject(err)
                }else{ 
                    console.log(result)
                    resolve(result)
                }
            });
        })
    }

    getPublications(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project : {publicacoes:1}
                },
                {
                    $unwind: "$publicacoes"
                },
                {
                    $sort: { "publicacoes.anoPublicacao": -1, "publicacoes.qualis": 1, "publicacoes.titulo": 1 }
                }
            ]).toArray(function (err, result) {
                if(err){
                    reject(err)
                }else{ 
                    console.log(result)
                    resolve(result)
                }
            });
        })
    }

    addPublication(user, data) {
        data._id = new ObjectID()
        data.autores = this.processAuthors(data.autores)
        data = this.preprocessData(data)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        publicacoes: {
                            _id: new ObjectID(),
                            ...data
                        }
                    }
                }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })

    }

    removePublication(id_user, idPublication) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: id_user },
                { $pull: { publicacoes: { _id: ObjectID(idPublication) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updatePublication(data) {
        const idPublication = data._id
        delete data._id
        data.autores = this.processAuthors(data.autores)
        data = this.preprocessData(data)

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'comprovante') && ((data['comprovante'] === 'undefined') || (data['comprovante'] === '')))) {
                newData[`publicacoes.$.${key}`] = data[key]
            }
        })
        console.log(newData)
        return new Promise((resolve, reject) => {
            collection.updateOne({ "publicacoes._id": ObjectID(idPublication) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoPublications()