const fs = require('fs')
const daoEventOrganizations = require('../../daos/extension/daoEventOrganizations')
const { validationResult } = require('express-validator')

class ControlerEventOrganizations {

    routes() {
        return {
            base: '/app/eventOrganizations',
            baseID: `/app/eventOrganizations/:id`
        }
    }

    addEventOrganization() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['pathArquivo'] = req.file.path
                }
                daoEventOrganizations.addEventOrganization(req.user, content)
                    .then(resultado => resp.json(resultado))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getEventOrganizations() {
        return function (req, resp) {
            daoEventOrganizations.getEventOrganizations(req.user)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    removeEventOrganization() {
        return function (req, resp) {
            daoEventOrganizations.removeEventOrganization(req.user.email, req.params.id)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    updateEventOrganization() {
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
                daoEventOrganizations.getEventOrganization(req.user, req.body._id)
                    .then(resultado => {
                        let oldPath = undefined
                        if (resultado[0] !== undefined) {
                            if ((resultado[0]['organizacoesEventos']['pathArquivo'] !== undefined)) {
                                oldPath = resultado[0]['organizacoesEventos']['pathArquivo']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoEventOrganizations.updateEventOrganization(content)
                            .then(resultado => resp.json(resultado))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerEventOrganizations()