const fs = require('fs')
const daoResearchFeedbacks = require('../../daos/research/daoResearchFeedbacks')
const { validationResult } = require('express-validator')

class ControlerResearchFeedback {

    routes() {
        return {
            base: '/app/researchFeedbacks',
            baseID: `/app/researchFeedbacks/:id`
        }
    }

    addResearchFeedback() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['filePath'] = req.file.path
                }
                daoResearchFeedbacks.addResearchFeedback(req.user, content)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getResearchFeedbacks() {
        return function (req, resp) {
            daoResearchFeedbacks.getResearchFeedbacks(req.user)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    removeResearchFeedback() {
        return function (req, resp) {
            daoResearchFeedbacks.removeResearchFeedback(req.user.email, req.params.id)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    updateResearchFeedback() {
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
                daoResearchFeedbacks.getResearchFeedback(req.user, req.body._id)
                    .then(result => {
                        let oldPath = undefined
                        if (result[0] !== undefined) {
                            if ((result[0]['pareceresesquisa']['filePath'] !== undefined)) {
                                oldPath = result[0]['pareceresPesquisa']['filePath']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoResearchFeedbacks.updateResearchFeedback(content)
                            .then(result => resp.json(result))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerResearchFeedback()