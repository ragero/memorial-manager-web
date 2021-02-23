const { ObjectID } = require("mongodb")

class DaoResearchFeedbacks {


    preprocessData(data){
        data.quantidade = Number(data.quantidade)
        return data
    }

    getResearchFeedback(user, idResearchFeedback){
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: {'email':user.email}
                },
                {
                    $project : {pareceresPesquisa:1}
                },
                {
                    $unwind: "$pareceresPesquisa"
                },
                {
                    $match: {'pareceresPesquisa._id': ObjectID(idResearchFeedback)}
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

    getResearchFeedbacks(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project : {pareceresPesquisa:1}
                },
                {
                    $unwind: "$pareceresPesquisa"
                },
                {
                    $sort: { "pareceresPesquisa.qualis": 1, "pareceresPesquisa.quantidade": 1}
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

    addResearchFeedback(user, data) {
        data._id = new ObjectID()
        data = this.preprocessData(data)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        pareceresPesquisa: {
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

    removeResearchFeedback(id_user, idResearchFeedback) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: id_user },
                { $pull: { pareceresPesquisa: { _id: ObjectID(idResearchFeedback) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updateResearchFeedback(data) {
        const idResearchFeedback = data._id
        delete data._id
        data.autores = this.processAuthors(data.autores)
        data = this.preprocessData(data)

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'proof') && ((data['proof'] === 'undefined') || (data['proof'] === '')))) {
                newData[`pareceresPesquisa.$.${key}`] = data[key]
            }
        })
        console.log(newData)
        return new Promise((resolve, reject) => {
            collection.updateOne({ "pareceresPesquisa._id": ObjectID(idResearchFeedback) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoResearchFeedbacks()