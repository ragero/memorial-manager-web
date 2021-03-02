const daoComplementaryFormations = require('../../daos/formation/daoComplementaryFormations')
const BaseControler = require('../baseControler')
const baseItem = 'formation'
const specificItem = 'complementaryFormations'

class ControlerComplementaryFormations {

    constructor(){
        this.controler = new BaseControler(daoComplementaryFormations, baseItem, specificItem)
    }

    routes() {
        return {
            base: '/app/formation/complementary_formations',
            baseID: `/app/formation/complementary_formations/:id`
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

module.exports = new ControlerComplementaryFormations()