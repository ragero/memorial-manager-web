const { ObjectID } = require("mongodb")


class BaseDao {

    constructor(baseField, sortFields){
        this.baseField = baseField
        this.sortFields = sortFields 
    }


    get(user, idData) {
        console.log(user, idData)
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project: { [this.baseField]: 1 }
                },
                {
                    $unwind: `$${this.baseField}`
                },
                {
                    $match: { [`${this.baseField}._id`]: ObjectID(idData) }
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
                    $project: { [this.baseField]: 1 }
                },
                {
                    $unwind: `$${this.baseField}`
                },
                {
                    $sort: this.sortFields
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

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        [this.baseField]: {
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
                { $pull: { [this.baseField]: { _id: ObjectID(idData) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }

    update(data) {
        // console.log('=======Dentro do update======')
        const idData = data._id
        delete data._id

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'proof') && ((data['proof'] === 'undefined') || (data['proof'] === '') || (data['proof'] === undefined)))) {
                newData[`${this.baseField}.$.${key}`] = data[key]
            }
        })
        return new Promise((resolve, reject) => {
            collection.updateOne({ [`${this.baseField}._id`]: ObjectID(idData) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = BaseDao