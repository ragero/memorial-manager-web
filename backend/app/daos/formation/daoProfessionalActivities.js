const { ObjectID } = require("mongodb")

const baseField = 'formation.professionalActivities'

class DaoProfessionalActivities {

    preprocessData(data) {
        data._id = new ObjectID()
        data.yearBegin = Number(data.yearBegin)
        if(data.yearEnd !== undefined || data.yearEnd !== ''){
            data.yearEnd = Number(data.yearEnd)
        }

        return data
    }

    get(user, idData) {
        console.log(user, idData)
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project: { [baseField]: 1 }
                },
                {
                    $unwind: `$${baseField}`
                },
                {
                    $match: { [`${baseField}._id`]: ObjectID(idData) }
                }
            ]).toArray(function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0])
                }
            });
        })
    }

    getAll(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project: { [baseField]: 1 }
                },
                {
                    $unwind: `$${baseField}`
                },
                {
                    $sort: { [`${baseField}.yearBegin`]: -1, [`${baseField}.role`]: 1}
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

    add(user, data) {
        data._id = new ObjectID()
        data = this.preprocessData(data)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        [baseField]: {
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

    remove(idUser, idData) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: idUser },
                { $pull: { [baseField]: { _id: ObjectID(idData) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }

    update(data) {
        console.log('=======Dentro do update Professional Activities======')
        const idData = data._id
        delete data._id
        data = this.preprocessData(data)

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'proof') && ((data['proof'] === 'undefined') || (data['proof'] === '') || (data['proof'] === undefined)))) {
                newData[`${baseField}.$.${key}`] = data[key]
            }
        })
        return new Promise((resolve, reject) => {
            collection.updateOne({ [`${formation.professionalActivities}._id`]: ObjectID(idData) },
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