const daoAcademicFormations = require('../../daos/formation/daoAcademicFormations')
const BaseControler = require('../baseControler')
const baseItem = 'formation'
const specificItem = 'academicFormations'

class ControlerAcademicFormations {

    constructor(){
        this.controler = new BaseControler(daoAcademicFormations,baseItem,specificItem)
    }

    routes() {
        return {
            base: '/app/formation/academic_formations',
            baseID: `/app/formation/academic_formations/:id`
        }
    }

    add() {
        return this.controler.add()
    }

    getAll() {
        return this.controler.getAll()
    }

    remove() {
        return this.controler.remove()
    }

    update() {
        return this.controler.update()
    }

}

module.exports = new ControlerAcademicFormations()