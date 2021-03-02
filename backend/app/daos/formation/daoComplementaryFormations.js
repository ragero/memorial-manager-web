const BaseDao = require('../baseDao')

const baseField = 'formation.complementaryFormations'
const sortFields = { [`${baseField}.yearBegin`]: -1, [`${baseField}.role`]: 1}

class DaoComplementaryFormation {

    constructor(){
        this.dao = new BaseDao(baseField,sortFields)
    }

    preprocessData(data) {
        if(data.yearEnd !== undefined ){
            data.yearEnd = Number(data.yearEnd)
        }

        if(data.proof !== undefined ){
            delete data.proof
        }
        
        return data
    }

    get(user, idData) {
        return this.dao.get(user,idData)
    }

    getAll(user) {
        return this.dao.getAll(user)
    }

    add(user, data) {
        data = this.preprocessData(data)
        return this.dao.add(user,data)
    }

    remove(idUser, idData) {
        return this.dao.remove(idUser, idData)
    }

    update(data) {
        data = this.preprocessData(data)
        return this.dao.update(data)
    }
}

module.exports = new DaoComplementaryFormation()