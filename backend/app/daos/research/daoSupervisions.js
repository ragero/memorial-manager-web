const { ObjectID } = require("mongodb")

class DaoSupervisions {

    preprocessData(data){
        data.anoInicio = Number(data.anoInicio)
        data.anoFim = Number(data.anoFim)
        return data
    }

    getSupervision(user, idSupervision){
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: {'email':user.email}
                },
                {
                    $project : {supervisions:1}
                },
                {
                    $unwind: "$supervisions"
                },
                {
                    $match: {'supervisions._id': ObjectID(idSupervision)}
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

    getSupervisions(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project : {supervisions:1}
                },
                {
                    $unwind: "$supervisions"
                },
                {
                    $sort: { "supervisions.anoInicio": -1, "supervisions.situacao": -1}
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

    addSupervision(user, data) {
        data._id = new ObjectID()
        data = this.preprocessData(data)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        supervisions: {
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

    removeSupervision(id_user, idSupervision) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: id_user },
                { $pull: { supervisions: { _id: ObjectID(idSupervision) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updateSupervision(data) {
        const idSupervision = data._id
        delete data._id
        data.autores = this.processAuthors(data.autores)
        data = this.preprocessData(data)

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'proof') && ((data['proof'] === 'undefined') || (data['proof'] === '')))) {
                newData[`supervisions.$.${key}`] = data[key]
            }
        })
        console.log(newData)
        return new Promise((resolve, reject) => {
            collection.updateOne({ "supervisions._id": ObjectID(idSupervision) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoSupervisions()