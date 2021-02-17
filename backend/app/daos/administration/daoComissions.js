const { ObjectID } = require("mongodb")

class DaoComissions {

    preprocessData(data){
        data.anoInicio = Number(data.anoInicio)
        data.anoFim = Number(data.anoFim)
        return data
    }

    getComission(user, idComission){
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: {'email':user.email}
                },
                {
                    $project : {comissoes:1}
                },
                {
                    $unwind: "$comissoes"
                },
                {
                    $match: {'comissoes._id': ObjectID(idComission)}
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

    getComissions(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project : {comissoes:1}
                },
                {
                    $unwind: "$comissoes"
                },
                {
                    $sort: { "comissoes.anoPublicacao": -1, "comissoes.qualis": 1, "comissoes.titulo": 1 }
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

    addComission(user, data) {
        data._id = new ObjectID()
        data.autores = this.processAuthors(data.autores)
        data = this.preprocessData(data)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        comissoes: {
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

    removeComission(id_user, idComission) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: id_user },
                { $pull: { comissoes: { _id: ObjectID(idComission) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updateComission(data) {
        const idComission = data._id
        delete data._id
        data.autores = this.processAuthors(data.autores)
        data = this.preprocessData(data)

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'comprovante') && ((data['comprovante'] === 'undefined') || (data['comprovante'] === '')))) {
                newData[`comissoes.$.${key}`] = data[key]
            }
        })
        console.log(newData)
        return new Promise((resolve, reject) => {
            collection.updateOne({ "comissoes._id": ObjectID(idComission) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoComissions()