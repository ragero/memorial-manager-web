const { ObjectID } = require("mongodb")

class DaoScholarShips {

    preprocessData(data) {
        data._id = new ObjectID()
        data.anoInicio = Number(data.anoInicio)
        data.anoFim = Number(data.anoFim)

        return data
    }

    getEventOrganization(user, idProject) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project: { bolsas: 1 }
                },
                {
                    $unwind: "$bolsas"
                },
                {
                    $match: { 'bolsas._id': ObjectID(idProject) }
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

    getScholarShips(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project: { bolsas: 1 }
                },
                {
                    $unwind: "$bolsas"
                },
                {
                    $sort: { "bolsas.anoInicio": -1, "bolsas.descricao": 1}
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
                        bolsas: {
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
                { $pull: { bolsas: { _id: ObjectID(idEventOrganization) } } },
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
                newData[`bolsas.$.${key}`] = data[key]
            }
        })
        console.log('=======Dentro do updateReasearchProject======')
        console.log('new data')
        console.log(newData)
        console.log('=============')
        return new Promise((resolve, reject) => {
            collection.updateOne({ "bolsas._id": ObjectID(idEventOrganization) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoScholarShips()