const { ObjectID } = require("mongodb")

class DaoEvaluations {

    preprocessData(data){
        data.ano = Number(data.ano)
        data.semestre = Number(data.semestre)
        return data
    }

    getEvaluation(user, idEvaluation){
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: {'email':user.email}
                },
                {
                    $project : {evaluations:1}
                },
                {
                    $unwind: "$evaluations"
                },
                {
                    $match: {'evaluations._id': ObjectID(idEvaluation)}
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

    getEvaluations(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project : {evaluations:1}
                },
                {
                    $unwind: "$evaluations"
                },
                {
                    $sort: { "evaluations.ano": -1, "evaluations.semestre": -1, "evaluations.nome": 1 }
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

    addEvaluation(user, data) {
        data._id = new ObjectID()
        data = this.preprocessData(data)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        evaluations: {
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

    removeEvaluation(id_user, idEvaluation) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: id_user },
                { $pull: { evaluations: { _id: ObjectID(idEvaluation) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updateEvaluation(data) {
        const idEvaluation = data._id
        delete data._id
        data = this.preprocessData(data)

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'comprovante') && ((data['comprovante'] === 'undefined') || (data['comprovante'] === '')))) {
                newData[`evaluations.$.${key}`] = data[key]
            }
        })
        console.log(newData)
        return new Promise((resolve, reject) => {
            collection.updateOne({ "evaluations._id": ObjectID(idEvaluation) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoEvaluations()