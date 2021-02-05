const { ObjectID } = require("mongodb")

class DaoPublications {

    getPublications(user){
        return new Promise((resolve,reject) => {
            collection.findOne({email:user.email}, {projection: {_id:0, publications:1}},function(err, result) {
                if (err){
                    reject(err)
                }else{
                    console.log(result)
                    resolve(result)
                } 
              });
        })

    }

    addPublication(data) {
        return new Promise((resolve,reject) => {
            collection.updateOne( { email: data.user.email },
            {
                $push: {
                    publications: {
                        _id: new ObjectID(),
                        ...data
                    }
                }
            }, function(err, document){
                if(err){
                    reject(err)
                }
                resolve(document)
            })
        })

    }

}

module.exports = new DaoPublications()