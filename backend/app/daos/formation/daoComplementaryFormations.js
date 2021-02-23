const { ObjectID } = require("mongodb")

class DaoComplementaryFormations {

    preprocessData(data) {
        data._id = new ObjectID()
        data.anoConclusao = Number(data.anoConclusao)
        return data
    }

    getComplementaryFormation(user, idProject) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project: { formacoesComplementares: 1 }
                },
                {
                    $unwind: "$formacoesComplementares"
                },
                {
                    $match: { 'formacoesComplementares._id': ObjectID(idProject) }
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

    getComplementaryFormation(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project: { formacoesComplementares: 1 }
                },
                {
                    $unwind: "$formacoesComplementares"
                },
                {
                    $sort: { "formacoesComplementares.coordena": -1, "formacoesComplementares.anoInicio": -1, "publicacoes.comFomento": -1, "publicacoes.comTitulo": -1 }
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

    addComplementaryFormation(user, data) {
        data._id = new ObjectID()
        data = this.preprocessData(data)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        formacoesComplementares: {
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

    removeComplementaryFormation(id_user, idComplementary) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: id_user },
                { $pull: { projetosExtensao: { _id: ObjectID(idComplementary) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updateComplementaryFormation(data) {
        const idComplementary = data._id
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
            collection.updateOne({ "projetosExtensao._id": ObjectID(idComplementary) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoComplementaryFormations()