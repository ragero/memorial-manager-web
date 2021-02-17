const fs = require('fs')
const daoEvaluations = require('../../daos/research/daoEvaluations')
const { validationResult } = require('express-validator')

class ControlerProcessEvaluation {

    routes() {
        return {
            base: '/app/administration/evaluations',
            baseID: `/app/administration/evaluations/:id`
        }
    }

    addEvaluation() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['pathArquivo'] = req.file.path
                }
                daoEvaluations.addEvaluation(req.user, content)
                    .then(resultado => resp.json(resultado))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getEvaluationdaoEvaluations() {
        return function (req, resp) {
            daoEvaluations.getEvaluationdaoEvaluations(req.user)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    removeEvaluation() {
        return function (req, resp) {
            daoEvaluations.removeEvaluation(req.user.email, req.params.id)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    updateEvaluation() {
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
                daoEvaluations.getEvaluation(req.user, req.body._id)
                    .then(resultado => {
                        let oldPath = undefined
                        if (resultado[0] !== undefined) {
                            if ((resultado[0]['processosAvaliacao']['pathArquivo'] !== undefined)) {
                                oldPath = resultado[0]['processosAvaliacao']['pathArquivo']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoEvaluations.updateEvaluation(content)
                            .then(resultado => resp.json(resultado))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerProcessEvaluation()