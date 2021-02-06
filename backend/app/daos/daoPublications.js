const { ObjectID } = require("mongodb")

class DaoPublications {

    getPublications(user) {
        return new Promise((resolve, reject) => {
            collection.find({ email: user.email }, { projection: { _id: 0, publicacoes: 1 } }).toArray(function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    console.log(result)
                    resolve(result)
                }
            });
        })

    }

    addPublication(data) {
        data.autores = data.autores.split(',')
        return new Promise((resolve, reject) => {
            collection.updateOne({ email: data.user.email },
                {
                    $push: {
                        publicacoes: {
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

    removePublication(id_user, id_publication) {
        return new Promise((resolve, reject) => {
            console.log('dentro do remove')
            console.log(id_user)
            console.log(id_publication)
            collection.updateOne({ email: id_user },
                { $pull: { publicacoes: { _id: ObjectID(id_publication) } } },
                function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })

        })

    }


    updatePublication(dados) {
        console.log('Dentro do update publications!!!!')
        return new Promise((resolve, reject) => {
            collection.updateOne({"publicacoes._id": ObjectID("601dc7d698acc158dc7e0867") },
                { $set: { "publicacoes.$.titulo": "Puta que o paril!!!" } }, function (err, document) {
                    if (err) {
                        reject(err)
                    }
                    resolve(document)
                })
        })
        // db.memorial.updateOne(

        // )

        // const query = { name: "Steve Lobsters", "items.type": "pizza" };
        // const updateDocument = {
        //     $set: { "items.$.size": "extra large" }
        // };
        // const result = await collection.updateOne(query, updateDocument);
    }
}

module.exports = new DaoPublications()