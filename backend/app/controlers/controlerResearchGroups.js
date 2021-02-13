const fs = require('fs')
const daoResearchGroups = require('../daos/daoResearchGroups')
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
                    content['pathArquivo'] = req.file.path
                }
                daoResearchGroups.addResearchGroup(req.user, content)
                    .then(resultado => resp.json(resultado))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getResearchGroups() {
        return function (req, resp) {
            daoResearchGroups.getResearchGroups(req.user)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    removeResearchGroup() {
        return function (req, resp) {
            daoResearchGroups.removeResearchGroup(req.user.email, req.params.id)
                .then(resultado => resp.json(resultado))
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
                    content['pathArquivo'] = req.file.path
                } else {
                    delete content['comprovante']
                }
                daoResearchGroups.getResearchGroup(req.user, req.body._id)
                    .then(resultado => {
                        let oldPath = undefined
                        if (resultado[0] !== undefined) {
                            if ((resultado[0]['gruposPesquisa']['pathArquivo'] !== undefined)) {
                                oldPath = resultado[0]['gruposPesquisa']['pathArquivo']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoResearchGroups.updateResearchGroup(content)
                            .then(resultado => resp.json(resultado))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerResearchGroup()