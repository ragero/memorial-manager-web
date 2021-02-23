const { ObjectID } = require("mongodb")

class DaoInternships {

    preprocessData(data){
        data.ano = Number(data.ano)
        data.semestre = Number(data.semestre)
        return data
    }

    getInternship(user, idInternship){
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: {'email':user.email}
                },
                {
                    $project : {internships:1}
                },
                {
                    $unwind: "$internships"
                },
                {
                    $match: {'internships._id': ObjectID(idInternship)}
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

    getInternships(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project : {internships:1}
                },
                {
                    $unwind: "$internships"
                },
                {
                    $sort: { "internships.ano": -1, "internships.semestre": -1, "internships.nome": 1 }
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

    addInternship(user, data) {
        data._id = new ObjectID()
        data = this.preprocessData(data)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        internships: {
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

    removeInternship(id_user, idInternship) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: id_user },
                { $pull: { internships: { _id: ObjectID(idInternship) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updateInternship(data) {
        const idInternship = data._id
        delete data._id
        data = this.preprocessData(data)

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'proof') && ((data['proof'] === 'undefined') || (data['proof'] === '')))) {
                newData[`internships.$.${key}`] = data[key]
            }
        })
        console.log(newData)
        return new Promise((resolve, reject) => {
            collection.updateOne({ "internships._id": ObjectID(idInternship) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoInternships()