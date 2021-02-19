const { ObjectID } = require("mongodb")

class DaoProfessionalActivities {

    preprocessData(data) {
        data._id = new ObjectID()
        data.ano = Number(data.ano)

        return data
    }

    getProfessionalActivity(user, idProject) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project: { atividadesProfissionais: 1 }
                },
                {
                    $unwind: "$atividadesProfissionais"
                },
                {
                    $match: { 'atividadesProfissionais._id': ObjectID(idProject) }
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

    getProfessionalActivity(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project: { atividadesProfissionais: 1 }
                },
                {
                    $unwind: "$atividadesProfissionais"
                },
                {
                    $sort: { "atividadesProfissionais.coordena": -1, "atividadesProfissionais.anoInicio": -1, "publicacoes.comFomento": -1, "publicacoes.comTitulo": -1 }
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

    addProfessionalActivity(user, data) {
        data._id = new ObjectID()
        data = this.preprocessData(data)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        atividadesProfissionais: {
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

    removeProfessionalActivity(id_user, idProfessionalActivitie) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: id_user },
                { $pull: { projetosExtensao: { _id: ObjectID(idProfessionalActivitie) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updateProfessionalActivity(data) {
        const idProfessionalActivitie = data._id
        delete data._id
        data = this.preprocessData(data)

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'comprovante') && ((data['comprovante'] === 'undefined') || (data['comprovante'] === '')))) {
                newData[`projetosExtensao.$.${key}`] = data[key]
            }
        })
        console.log('=======Dentro do updateReasearchProject======')
        console.log('new data')
        console.log(newData)
        console.log('=============')
        return new Promise((resolve, reject) => {
            collection.updateOne({ "projetosExtensao._id": ObjectID(idProfessionalActivitie) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoProfessionalActivities()