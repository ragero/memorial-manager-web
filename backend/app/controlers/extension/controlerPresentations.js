const fs = require('fs')
const daoPresentations = require('../../daos/extension/daoPresentations')
const { validationResult } = require('express-validator')

class ControlerPresentation {

    routes() {
        return {
            base: '/app/Presentations',
            baseID: `/app/Presentations/:id`
        }
    }

    addPresentation() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['filePath'] = req.file.path
                }
                daoPresentations.addPresentation(req.user, content)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getPresentations() {
        return function (req, resp) {
            daoPresentations.getPresentations(req.user)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    removePresentation() {
        return function (req, resp) {
            daoPresentations.removePresentation(req.user.email, req.params.id)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    updatePresentation() {
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
                daoPresentations.getPresentation(req.user, req.body._id)
                    .then(result => {
                        let oldPath = undefined
                        if (result[0] !== undefined) {
                            if ((result[0]['apresentacoes']['filePath'] !== undefined)) {
                                oldPath = result[0]['apresentacoes']['filePath']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoPresentations.updatePresentation(content)
                            .then(result => resp.json(result))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerPresentation()