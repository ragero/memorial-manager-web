const fs = require('fs')
const daoComplementaryFormations = require('../../daos/formation/daoComplementaryFormations')
const { validationResult } = require('express-validator')

class ControlerAdademicFormation {

    routes() {
        return {
            base: '/app/complementaryFormations',
            baseID: `/app/complementaryFormations/:id`
        }
    }

    addAdademicFormation() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['pathArquivo'] = req.file.path
                }
                daoComplementaryFormations.addAdademicFormation(req.user, content)
                    .then(resultado => resp.json(resultado))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getComplementaryFormations() {
        return function (req, resp) {
            daoComplementaryFormations.getComplementaryFormations(req.user)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    removeAdademicFormation() {
        return function (req, resp) {
            daoComplementaryFormations.removeAdademicFormation(req.user.email, req.params.id)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    updateAdademicFormation() {
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
                daoComplementaryFormations.getAdademicFormation(req.user, req.body._id)
                    .then(resultado => {
                        let oldPath = undefined
                        if (resultado[0] !== undefined) {
                            if ((resultado[0]['formacoesComplementares']['pathArquivo'] !== undefined)) {
                                oldPath = resultado[0]['formacoesComplementares']['pathArquivo']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoComplementaryFormations.updateAdademicFormation(content)
                            .then(resultado => resp.json(resultado))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }

}

module.exports = new ControlerAdademicFormation()