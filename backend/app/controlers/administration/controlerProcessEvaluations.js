const fs = require('fs')
const daoProcessEvaluations = require('../../daos/administration/daoProcessEvaluations')
const { validationResult } = require('express-validator')

class ControlerProcessEvaluation {

    routes() {
        return {
            base: '/app/administration/evaluations',
            baseID: `/app/administration/evaluations/:id`
        }
    }

    addProcessEvaluation() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['pathArquivo'] = req.file.path
                }
                daoProcessEvaluations.addProcessEvaluation(req.user, content)
                    .then(resultado => resp.json(resultado))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getProcessEvaluations() {
        return function (req, resp) {
            daoProcessEvaluations.getProcessEvaluations(req.user)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    removeProcessEvaluation() {
        return function (req, resp) {
            daoProcessEvaluations.removeProcessEvaluation(req.user.email, req.params.id)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    updateProcessEvaluation() {
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
                daoProcessEvaluations.getProcessEvaluation(req.user, req.body._id)
                    .then(resultado => {
                        let oldPath = undefined
                        if (resultado[0] !== undefined) {
                            if ((resultado[0]['processosAvaliacao']['pathArquivo'] !== undefined)) {
                                oldPath = resultado[0]['processosAvaliacao']['pathArquivo']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoProcessEvaluations.updateProcessEvaluation(content)
                            .then(resultado => resp.json(resultado))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerProcessEvaluation()