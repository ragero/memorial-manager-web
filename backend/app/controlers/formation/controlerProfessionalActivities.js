const daoProfessionalActivities = require('../../daos/formation/daoProfessionalActivities')
const BaseControler = require('../baseControler')
const baseItem = 'formation'
const specificItem = 'professionalActivities'


class ControlerProfessionalActivity {

    constructor(){
        this.controler = new BaseControler(daoProfessionalActivities, baseItem, specificItem)
    }

    routes() {
        return {
            base: '/app/formation/professional_activities',
            baseID: `/app/formation/professional_activities/:id`
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

module.exports = new ControlerProfessionalActivity()