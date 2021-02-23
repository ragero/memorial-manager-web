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
                    content['filePath'] = req.file.path
                }
                daoSupervisions.addSupervision(req.user, content)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getSupervisions() {
        return function (req, resp) {
            daoSupervisions.getSupervisions(req.user)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    removeSupervision() {
        return function (req, resp) {
            console.log('Body=====')
            console.log(req.body)
            console.log(req.params)
            daoSupervisions.removeSupervision(req.user.email, req.params.id)
                .then(result => resp.json(result))
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
                    content['filePath'] = req.file.path
                } else {
                    delete content['proof']
                }
                daoSupervisions.getSupervision(req.user, req.body._id)
                    .then(result => {
                        let oldPath = undefined
                        if (result[0] !== undefined) {
                            if ((result[0]['publicacoes']['filePath'] !== undefined)) {
                                oldPath = result[0]['publicacoes']['filePath']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoSupervisions.updateSupervision(content)
                            .then(result => resp.json(result))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerSupervision()