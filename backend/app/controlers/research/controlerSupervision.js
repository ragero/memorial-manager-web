const fs = require('fs')
const daoSupervisions = require('../../daos/research/daoSupervisions')
const { validationResult } = require('express-validator')

class ControlerSupervision {

    routes() {
        return {
            base: '/app/supervisions',
            baseID: `/app/supervisions/:id`
        }
    }

    addSupervision() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['pathArquivo'] = req.file.path
                }
                daoSupervisions.addSupervision(req.user, content)
                    .then(resultado => resp.json(resultado))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getSupervisions() {
        return function (req, resp) {
            daoSupervisions.getSupervisions(req.user)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    removeSupervision() {
        return function (req, resp) {
            console.log('Body=====')
            console.log(req.body)
            console.log(req.params)
            daoSupervisions.removeSupervision(req.user.email, req.params.id)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    updateSupervision() {
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
                daoSupervisions.getSupervision(req.user, req.body._id)
                    .then(resultado => {
                        let oldPath = undefined
                        if (resultado[0] !== undefined) {
                            if ((resultado[0]['publicacoes']['pathArquivo'] !== undefined)) {
                                oldPath = resultado[0]['publicacoes']['pathArquivo']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoSupervisions.updateSupervision(content)
                            .then(resultado => resp.json(resultado))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerSupervision()