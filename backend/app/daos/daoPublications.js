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

    getPublications(user) {
        return new Promise((resolve, reject) => {
            // collection.find({ email: user.email }, { projection: { _id: 0, publicacoes: 1 } }).toArray(function (err, result) {
            //     if (err) {
            //         reject(err)
            //     } else {
            //         console.log(result)
            //         resolve(result)
            //     }
            // })
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
        data.anoPublicacao = Number(data.anoPublicacao)
        data.paginaInicial = Number(data.paginaInicial)
        data.paginaFinal = Number(data.paginaFinal)

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

    removePublication(id_user, id_publication) {
        return new Promise((resolve, reject) => {
            console.log('dentro do remove')
            console.log(id_user)
            console.log(id_publication)
            collection.updateOne({ email: id_user },
                { $pull: { publicacoes: { _id: ObjectID(id_publication) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updatePublication(data) {
        console.log('Dentro do update publications!!!!')
        const idPublication = data._id
        delete data._id
        data.anoPublicacao = Number(data.anoPublicacao)
        data.paginaInicial = Number(data.paginaInicial)
        data.paginaFinal = Number(data.paginaFinal)
        data.autores = this.processAuthors(data.autores)

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