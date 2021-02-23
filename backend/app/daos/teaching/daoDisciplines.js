const { ObjectID } = require("mongodb")

class DaoDisciplines {

    preprocessData(data){
        data.ano = Number(data.ano)
        data.semestre = Number(data.semestre)
        data.cargaHoraria = Number(data.cargaHoraria)
        return data
    }

    getDiscipline(user, idDiscipline){
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: {'email':user.email}
                },
                {
                    $project : {disciplinas:1}
                },
                {
                    $unwind: "$disciplinas"
                },
                {
                    $match: {'disciplinas._id': ObjectID(idDiscipline)}
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

    getDisciplines(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project : {disciplinas:1}
                },
                {
                    $unwind: "$disciplinas"
                },
                {
                    $sort: { "disciplinas.ano": -1, "disciplinas.semestre": -1, "disciplinas.nome": 1 }
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

    addDiscipline(user, data) {
        data._id = new ObjectID()
        data = this.preprocessData(data)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        disciplinas: {
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

    removeDiscipline(id_user, idDiscipline) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: id_user },
                { $pull: { disciplinas: { _id: ObjectID(idDiscipline) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updateDiscipline(data) {
        const idDiscipline = data._id
        delete data._id
        data = this.preprocessData(data)

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'proof') && ((data['proof'] === 'undefined') || (data['proof'] === '')))) {
                newData[`disciplinas.$.${key}`] = data[key]
            }
        })
        console.log(newData)
        return new Promise((resolve, reject) => {
            collection.updateOne({ "disciplinas._id": ObjectID(idDiscipline) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoDisciplines()