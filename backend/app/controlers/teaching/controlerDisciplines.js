const fs = require('fs')
const daoDisciplines = require('../../daos/teaching/daoDisciplines')
const { validationResult } = require('express-validator')

class ControlerDiscipline {


    routes() {
        return {
            base: '/app/disciplines',
            baseID: `/app/disciplines/:id`
        }
    }

    addDiscipline() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['filePath'] = req.file.path
                }
                daoDisciplines.addDiscipline(req.user, content)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getDisciplines() {
        return function (req, resp) {
            daoDisciplines.getDisciplines(req.user)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    removeDiscipline() {
        return function (req, resp) {
            console.log('Body=====')
            console.log(req.body)
            console.log(req.params)
            daoDisciplines.removeDiscipline(req.user.email, req.params.id)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    updateDiscipline() {
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
                daoDisciplines.getDiscipline(req.user, req.body._id)
                    .then(result => {
                        let oldPath = undefined
                        if (result[0] !== undefined) {
                            if ((result[0]['disciplines']['filePath'] !== undefined)) {
                                oldPath = result[0]['disciplines']['filePath']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoDisciplines.updateDiscipline(content)
                            .then(result => resp.json(result))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerDiscipline()