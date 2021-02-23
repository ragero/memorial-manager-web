const { ObjectID } = require("mongodb")

class DaoBoards {

    preprocessData(data){
        data.ano = Number(data.ano)
        return data
    }

    getBoard(user, idBoard){
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: {'email':user.email}
                },
                {
                    $project : {bancasConcurso:1}
                },
                {
                    $unwind: "$bancasConcurso"
                },
                {
                    $match: {'bancasConcurso._id': ObjectID(idBoard)}
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

    getBoards(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project : {bancasConcurso:1}
                },
                {
                    $unwind: "$bancasConcurso"
                },
                {
                    $sort: { "bancasConcurso.anoPublicacao": -1, "bancasConcurso.qualis": 1, "bancasConcurso.titulo": 1 }
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

    addBoard(user, data) {
        data._id = new ObjectID()
        data.autores = this.processAuthors(data.autores)
        data = this.preprocessData(data)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        bancasConcurso: {
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

    removeBoard(id_user, idBoard) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: id_user },
                { $pull: { bancasConcurso: { _id: ObjectID(idBoard) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updateBoard(data) {
        const idBoard = data._id
        delete data._id
        data.autores = this.processAuthors(data.autores)
        data = this.preprocessData(data)

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'proof') && ((data['proof'] === 'undefined') || (data['proof'] === '')))) {
                newData[`bancasConcurso.$.${key}`] = data[key]
            }
        })
        console.log(newData)
        return new Promise((resolve, reject) => {
            collection.updateOne({ "bancasConcurso._id": ObjectID(idBoard) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoBoards()