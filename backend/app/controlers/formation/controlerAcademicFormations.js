const fs = require('fs')
const daoAcademicFormations = require('../../daos/formation/daoAcademicFormations')
const { validationResult } = require('express-validator')

class ControlerAcademicFormation {

    routes() {
        return {
            base: '/app/academicFormations',
            baseID: `/app/academicFormations/:id`
        }
    }

    addAcademicFormation() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['filePath'] = req.file.path
                }
                daoAcademicFormations.addAcademicFormation(req.user, content)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getAcademicFormations() {
        return function (req, resp) {
            daoAcademicFormations.getAcademicFormations(req.user)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    removeAcademicFormation() {
        return function (req, resp) {
            daoAcademicFormations.removeAcademicFormation(req.user.email, req.params.id)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    updateAcademicFormation() {
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
                daoAcademicFormations.getAcademicFormation(req.user, req.body._id)
                    .then(result => {
                        let oldPath = undefined
                        if (result[0] !== undefined) {
                            if ((result[0]['formacoesAcademicas']['filePath'] !== undefined)) {
                                oldPath = result[0]['formacoesAcademicas']['filePath']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoAcademicFormations.updateAcademicFormation(content)
                            .then(result => resp.json(result))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerAcademicFormation()