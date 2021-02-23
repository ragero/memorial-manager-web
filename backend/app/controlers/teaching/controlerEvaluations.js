const fs = require('fs')
const daoEvaluations = require('../../daos/teaching/daoEvaluations')
const { validationResult } = require('express-validator')

class ControlerEvaluation {


    routes() {
        return {
            base: '/app/evaluations',
            baseID: `/app/evaluations/:id`
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
                    content['filePath'] = req.file.path
                }
                daoEvaluations.addEvaluation(req.user, content)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getEvaluations() {
        return function (req, resp) {
            daoEvaluations.getEvaluations(req.user)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    removeEvaluation() {
        return function (req, resp) {
            console.log('Body=====')
            console.log(req.body)
            console.log(req.params)
            daoEvaluations.removeEvaluation(req.user.email, req.params.id)
                .then(result => resp.json(result))
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
                    content['filePath'] = req.file.path
                } else {
                    delete content['proof']
                }
                daoEvaluations.getEvaluation(req.user, req.body._id)
                    .then(result => {
                        let oldPath = undefined
                        if (result[0] !== undefined) {
                            if ((result[0]['evaluations']['filePath'] !== undefined)) {
                                oldPath = result[0]['evaluations']['filePath']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoEvaluations.updateEvaluation(content)
                            .then(result => resp.json(result))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerEvaluation()