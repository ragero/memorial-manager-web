const { ObjectID } = require("mongodb")

class DaoResearchGroups {

    processLeaders(leaders) {
        const finalLeaders = leaders.split(',').filter((leaders) => {
            if (leader.trim() != '') {
                return true
            } else {
                return false
            }
        })
        return finalLeaders
    }


    getResearchGroup(user, idResearchGroup){
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: {'email':user.email}
                },
                {
                    $project : {gruposPesquisa:1}
                },
                {
                    $unwind: "$gruposPesquisa"
                },
                {
                    $match: {'gruposPesquisa._id': ObjectID(idResearchGroup)}
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

    getResearchGroups(user) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                {
                    $match: { 'email': user.email }
                },
                {
                    $project : {gruposPesquisa:1}
                },
                {
                    $unwind: "$gruposPesquisa"
                },
                {
                    $sort: { "gruposPesquisa.nome": 1}
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

    addResearchGroup(user, data) {
        data._id = new ObjectID()
        data.lideres = this.processLeaders(data.lideres)

        return new Promise((resolve, reject) => {
            collection.updateOne({ email: user.email },
                {
                    $push: {
                        projetosPesquisa: {
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

    removeResearchGroup(id_user, idResearchGroup) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: id_user },
                { $pull: { projetosPesquisa: { _id: ObjectID(idResearchGroup) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updateResearchGroup(data) {
        const idResearchGroup = data._id
        delete data._id
        data.lideres = this.processLeadres(data.lideres)
        data = this.preprocessData(data)

        const newData = {}
        Object.keys(data).forEach((key) => {
            if (!((key === 'proof') && ((data['proof'] === 'undefined') || (data['proof'] === '')))) {
                newData[`gruposPesquisa.$.${key}`] = data[key]
            }
        })
        console.log(newData)
        return new Promise((resolve, reject) => {
            collection.updateOne({ "gruposPesquisa._id": ObjectID(idResearchGroup) },
                { $set: newData }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
    }
}

module.exports = new DaoResearchGroups()