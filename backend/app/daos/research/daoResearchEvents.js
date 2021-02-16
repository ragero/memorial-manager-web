const { ObjectID } = require("mongodb")

class DaoResearchEvents {


    preprocessData(data){
        data.anoEvento = Number(data.anoEvento)
        return data
    }

    getResearchEvent(user, idResearchEvent){
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: {'email':user.email}
                },
                {
                    $project : {eventosPesquisa:1}
                },
                {
                    $unwind: "$eventosPesquisa"
                },
                {
                    $match: {'eventosPesquisa._id': ObjectID(idResearchEvent)}
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

    getResearchEvents(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project : {eventosPesquisa:1}
                },
                {
                    $unwind: "$eventosPesquisa"
                },
                {
                    $sort: { "eventosPesquisa.ano": -1, "eventosPesquisa.titulo": 1}
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

    addResearchEvent(user, data) {
        data._id = new ObjectID()
        data = this.preprocessData(data)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        eventosPesquisa: {
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

    removeResearchEvent(id_user, idResearchEvent) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: id_user },
                { $pull: { eventosPesquisa: { _id: ObjectID(idResearchEvent) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updateResearchEvent(data) {
        const idResearchEvent = data._id
        delete data._id
        data.autores = this.processAuthors(data.autores)
        data = this.preprocessData(data)

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'comprovante') && ((data['comprovante'] === 'undefined') || (data['comprovante'] === '')))) {
                newData[`eventosPesquisa.$.${key}`] = data[key]
            }
        })
        console.log(newData)
        return new Promise((resolve, reject) => {
            collection.updateOne({ "eventosPesquisa._id": ObjectID(idResearchEvent) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoResearchEvents()