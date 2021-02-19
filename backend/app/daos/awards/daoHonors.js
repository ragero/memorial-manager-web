const { ObjectID } = require("mongodb")

class DaoHonors {

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
                    $project: { honors: 1 }
                },
                {
                    $unwind: "$honors"
                },
                {
                    $match: { 'honors._id': ObjectID(idProject) }
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

    getHonors(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project: { honors: 1 }
                },
                {
                    $unwind: "$honors"
                },
                {
                    $sort: { "honors.ano": -1, "honors.descricao": 1}
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
                        honors: {
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
                { $pull: { honors: { _id: ObjectID(idEventOrganization) } } },
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
                newData[`honors.$.${key}`] = data[key]
            }
        })
        console.log('=======Dentro do updateReasearchProject======')
        console.log('new data')
        console.log(newData)
        console.log('=============')
        return new Promise((resolve, reject) => {
            collection.updateOne({ "honors._id": ObjectID(idEventOrganization) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoHonors()