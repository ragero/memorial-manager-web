const { ObjectID } = require("mongodb")

class DaoExtensionProjects {

    preprocessData(data) {
        data._id = new ObjectID()
        data.anoInicio = Number(data.anoInicio)
        data.anoFim = Number(data.anoFim)
        data.coordena = Boolean(data.coordena)
        data.fomento = Boolean(data.fomento)

        return data
    }

    getExtensionProject(user, idProject) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project: { projetosExtensao: 1 }
                },
                {
                    $unwind: "$projetosExtensao"
                },
                {
                    $match: { 'projetosExtensao._id': ObjectID(idProject) }
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

    getExtensionProjects(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project: { projetosExtensao: 1 }
                },
                {
                    $unwind: "$projetosExtensao"
                },
                {
                    $sort: { "projetosExtensao.coordena": -1, "projetosExtensao.anoInicio": -1, "publicacoes.comFomento": -1, "publicacoes.comTitulo": -1 }
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

    addExtensionProject(user, data) {
        data._id = new ObjectID()
        data = this.preprocessData(data)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        projetosExtensao: {
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

    removeExtensionProject(id_user, idExtensionProject) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: id_user },
                { $pull: { projetosExtensao: { _id: ObjectID(idExtensionProject) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updateExtensionProject(data) {
        const idExtensionProject = data._id
        delete data._id
        data = this.preprocessData(data)

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'proof') && ((data['proof'] === 'undefined') || (data['proof'] === '')))) {
                newData[`projetosExtensao.$.${key}`] = data[key]
            }
        })
        console.log('=======Dentro do updateReasearchProject======')
        console.log('new data')
        console.log(newData)
        console.log('=============')
        return new Promise((resolve, reject) => {
            collection.updateOne({ "projetosExtensao._id": ObjectID(idExtensionProject) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoExtensionProjects()