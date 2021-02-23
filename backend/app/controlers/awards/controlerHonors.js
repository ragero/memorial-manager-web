const fs = require('fs')
const daoHonors = require('../../daos/awards/daoHonors')
const { validationResult } = require('express-validator')

class ControlerHonors {

    routes() {
        return {
            base: '/app/honors',
            baseID: `/app/honors/:id`
        }
    }

    addHonor() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['filePath'] = req.file.path
                }
                daoHonors.addHonor(req.user, content)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getHonors() {
        return function (req, resp) {
            daoHonors.getHonors(req.user)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    removeHonor() {
        return function (req, resp) {
            daoHonors.removeHonor(req.user.email, req.params.id)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    updateHonor() {
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
                daoHonors.getHonor(req.user, req.body._id)
                    .then(result => {
                        let oldPath = undefined
                        if (result[0] !== undefined) {
                            if ((result[0]['honors']['filePath'] !== undefined)) {
                                oldPath = result[0]['honors']['filePath']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoHonors.updateHonor(content)
                            .then(result => resp.json(result))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerHonors()