const { ObjectID } = require("mongodb")

class DaoResearchProjects {

    preprocessData(data) {
        data._id = new ObjectID()
        data.anoInicio = Number(data.anoInicio)
        data.anoFim = Number(data.anoFim)
        data.coordena = Boolean(data.coordena)
        data.fomento = Boolean(data.fomento)

        return data
    }

    getResearchProject(user, idProject) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project: { projetosPesquisa: 1 }
                },
                {
                    $unwind: "$projetosPesquisa"
                },
                {
                    $match: { 'projetosPesquisa._id': ObjectID(idProject) }
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

    getResearchProjects(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project: { projetosPesquisa: 1 }
                },
                {
                    $unwind: "$projetosPesquisa"
                },
                {
                    $sort: { "projetosPesquisa.coordena": -1, "projetosPesquisa.anoInicio": -1, "publicacoes.comFomento": -1, "publicacoes.comTitulo": -1 }
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

    addResearchProject(user, data) {
        data._id = new ObjectID()
        data = this.preprocessData(data)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        projetosPesquisa: {
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

    removeResearchProject(id_user, idResearchProject) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: id_user },
                { $pull: { projetosPesquisa: { _id: ObjectID(idResearchProject) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updateResearchProject(data) {
        const idResearchProject = data._id
        delete data._id
        data = this.preprocessData(data)

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'proof') && ((data['proof'] === 'undefined') || (data['proof'] === '')))) {
                newData[`projetosPesquisa.$.${key}`] = data[key]
            }
        })
        console.log('=======Dentro do updateReasearchProject======')
        console.log('new data')
        console.log(newData)
        console.log('=============')
        return new Promise((resolve, reject) => {
            collection.updateOne({ "projetosPesquisa._id": ObjectID(idResearchProject) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoResearchProjects()