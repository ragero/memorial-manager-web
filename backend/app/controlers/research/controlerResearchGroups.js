const fs = require('fs')
const daoResearchGroups = require('../../daos/research/daoResearchGroups')
const { validationResult } = require('express-validator')

class ControlerResearchGroup {

    routes() {
        return {
            base: '/app/researchGroups',
            baseID: `/app/researchGroups/:id`
        }
    }

    addResearchGroup() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['filePath'] = req.file.path
                }
                daoResearchGroups.addResearchGroup(req.user, content)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getResearchGroups() {
        return function (req, resp) {
            daoResearchGroups.getResearchGroups(req.user)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    removeResearchGroup() {
        return function (req, resp) {
            daoResearchGroups.removeResearchGroup(req.user.email, req.params.id)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    updateResearchGroup() {
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
                daoResearchGroups.getResearchGroup(req.user, req.body._id)
                    .then(result => {
                        let oldPath = undefined
                        if (result[0] !== undefined) {
                            if ((result[0]['gruposPesquisa']['filePath'] !== undefined)) {
                                oldPath = result[0]['gruposPesquisa']['filePath']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoResearchGroups.updateResearchGroup(content)
                            .then(result => resp.json(result))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerResearchGroup()