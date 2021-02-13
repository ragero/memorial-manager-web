const fs = require('fs')
const daoResearchFeedbacks = require('../daos/daoResearchFeedbacks')
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
                    content['pathArquivo'] = req.file.path
                }
                daoResearchFeedbacks.addResearchFeedback(req.user, content)
                    .then(resultado => resp.json(resultado))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getResearchFeedbacks() {
        return function (req, resp) {
            daoResearchFeedbacks.getResearchFeedbacks(req.user)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    removeResearchFeedback() {
        return function (req, resp) {
            daoResearchFeedbacks.removeResearchFeedback(req.user.email, req.params.id)
                .then(resultado => resp.json(resultado))
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
                    content['pathArquivo'] = req.file.path
                } else {
                    delete content['comprovante']
                }
                daoResearchFeedbacks.getResearchFeedback(req.user, req.body._id)
                    .then(resultado => {
                        let oldPath = undefined
                        if (resultado[0] !== undefined) {
                            if ((resultado[0]['projetosPesquisa']['pathArquivo'] !== undefined)) {
                                oldPath = resultado[0]['projetosPesquisa']['pathArquivo']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoResearchFeedbacks.updateResearchFeedback(content)
                            .then(resultado => resp.json(resultado))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerResearchFeedback()