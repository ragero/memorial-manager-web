const BaseDao = require('../baseDao')

const baseField = 'formation.academicFormations'
const sortFields = { [`${baseField}.yearEnd`]: -1, [`${baseField}.yearBegin`]: -1, [`${baseField}.course`]: 1}

class DaoAcademicFormations {

    constructor(){
        this.dao = new BaseDao(baseField,sortFields)
    }

    preprocessData(data) {
        data.yearBegin = Number(data.yearBegin)
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

module.exports = new DaoAcademicFormations()