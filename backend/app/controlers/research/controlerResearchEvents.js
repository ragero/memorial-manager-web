const fs = require('fs')
const daoResearchEvents = require('../../daos/research/daoResearchEvents')
const { validationResult } = require('express-validator')

class ControlerResearchEvent {

    routes() {
        return {
            base: '/app/researchEvents',
            baseID: `/app/researchEvents/:id`
        }
    }

    addResearchEvent() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['filePath'] = req.file.path
                }
                daoResearchEvents.addResearchEvent(req.user, content)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getResearchEvents() {
        return function (req, resp) {
            daoResearchEvents.getResearchEvents(req.user)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    removeResearchEvent() {
        return function (req, resp) {
            daoResearchEvents.removeResearchEvent(req.user.email, req.params.id)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    updateResearchEvent() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['filePath'] = req.file.path
                } else {
                    delete content['proof']
                }
                daoResearchEvents.getResearchEvent(req.user, req.body._id)
                    .then(result => {
                        let oldPath = undefined
                        if (result[0] !== undefined) {
                            if ((result[0]['eventosPesquisa']['filePath'] !== undefined)) {
                                oldPath = result[0]['eventosPesquisa']['filePath']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoResearchEvents.updateResearchEvent(content)
                            .then(result => resp.json(result))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerResearchEvent()