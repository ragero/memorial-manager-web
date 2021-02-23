const { ObjectID } = require("mongodb")

class DaoProcessEvaluations {

    preprocessData(data){
        data.ano = Number(data.ano)
        return data
    }

    getProcessEvaluation(user, idProcessEvaluation){
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: {'email':user.email}
                },
                {
                    $project : {processosAvaliacao:1}
                },
                {
                    $unwind: "$processosAvaliacao"
                },
                {
                    $match: {'processosAvaliacao._id': ObjectID(idProcessEvaluation)}
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

    getProcessEvaluations(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project : {processosAvaliacao:1}
                },
                {
                    $unwind: "$processosAvaliacao"
                },
                {
                    $sort: { "processosAvaliacao.anoPublicacao": -1, "processosAvaliacao.qualis": 1, "processosAvaliacao.titulo": 1 }
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

    addProcessEvaluation(user, data) {
        data._id = new ObjectID()
        data.autores = this.processAuthors(data.autores)
        data = this.preprocessData(data)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        processosAvaliacao: {
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

    removeProcessEvaluation(id_user, idProcessEvaluation) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: id_user },
                { $pull: { processosAvaliacao: { _id: ObjectID(idProcessEvaluation) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updateProcessEvaluation(data) {
        const idProcessEvaluation = data._id
        delete data._id
        data.autores = this.processAuthors(data.autores)
        data = this.preprocessData(data)

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'proof') && ((data['proof'] === 'undefined') || (data['proof'] === '')))) {
                newData[`processosAvaliacao.$.${key}`] = data[key]
            }
        })
        console.log(newData)
        return new Promise((resolve, reject) => {
            collection.updateOne({ "processosAvaliacao._id": ObjectID(idProcessEvaluation) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoProcessEvaluations()