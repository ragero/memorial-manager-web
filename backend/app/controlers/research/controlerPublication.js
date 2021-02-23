const fs = require('fs')
const daoPublications = require('../../daos/research/daoPublications')
const { validationResult } = require('express-validator')

class ControlerPublication {


    routes() {
        return {
            base: '/app/publications',
            baseID: `/app/publications/:id`
        }
    }

    addPublication() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['filePath'] = req.file.path
                }
                daoPublications.addPublication(req.user, content)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getPublications() {
        return function (req, resp) {
            daoPublications.getPublications(req.user)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    removePublication() {
        return function (req, resp) {
            console.log('Body=====')
            console.log(req.body)
            console.log(req.params)
            daoPublications.removePublication(req.user.email, req.params.id)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    updatePublication() {
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
                daoPublications.getPublication(req.user, req.body._id)
                    .then(result => {
                        let oldPath = undefined
                        if (result[0] !== undefined) {
                            if ((result[0]['publicacoes']['filePath'] !== undefined)) {
                                oldPath = result[0]['publicacoes']['filePath']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoPublications.updatePublication(content)
                            .then(result => resp.json(result))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerPublication()