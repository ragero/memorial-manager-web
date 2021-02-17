const { ObjectID } = require("mongodb")

class DaoEventOrganizations {

    preprocessData(data) {
        data._id = new ObjectID()
        data.ano = Number(data.ano)

        return data
    }

    getEventOrganization(user, idProject) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project: { organizacaoEventos: 1 }
                },
                {
                    $unwind: "$organizacaoEventos"
                },
                {
                    $match: { 'organizacaoEventos._id': ObjectID(idProject) }
                }
            ]).toArray(function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    console.log(result)
                    resolve(result)
                }
            });
        })
    }

    getEventOrganizations(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project: { organizacaoEventos: 1 }
                },
                {
                    $unwind: "$organizacaoEventos"
                },
                {
                    $sort: { "organizacaoEventos.ano": -1, "organizacaoEventos.titulo": 1, "publicacoes.local": 1}
                }
            ]).toArray(function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    console.log(result)
                    resolve(result)
                }
            });
        })
    }

    addEventOrganization(user, data) {
        data._id = new ObjectID()
        data = this.preprocessData(data)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        organizacaoEventos: {
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

    removeEventOrganization(id_user, idEventOrganization) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: id_user },
                { $pull: { organizacaoEventos: { _id: ObjectID(idEventOrganization) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updateEventOrganization(data) {
        const idEventOrganization = data._id
        delete data._id
        data = this.preprocessData(data)

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'comprovante') && ((data['comprovante'] === 'undefined') || (data['comprovante'] === '')))) {
                newData[`organizacaoEventos.$.${key}`] = data[key]
            }
        })
        console.log('=======Dentro do updateReasearchProject======')
        console.log('new data')
        console.log(newData)
        console.log('=============')
        return new Promise((resolve, reject) => {
            collection.updateOne({ "organizacaoEventos._id": ObjectID(idEventOrganization) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoEventOrganizations()