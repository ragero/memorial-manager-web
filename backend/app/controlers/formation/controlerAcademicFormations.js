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
                    content['pathArquivo'] = req.file.path
                }
                daoAcademicFormations.addAcademicFormation(req.user, content)
                    .then(resultado => resp.json(resultado))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getAcademicFormations() {
        return function (req, resp) {
            daoAcademicFormations.getAcademicFormations(req.user)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    removeAcademicFormation() {
        return function (req, resp) {
            daoAcademicFormations.removeAcademicFormation(req.user.email, req.params.id)
                .then(resultado => resp.json(resultado))
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
                    content['pathArquivo'] = req.file.path
                } else {
                    delete content['comprovante']
                }
                daoAcademicFormations.getAcademicFormation(req.user, req.body._id)
                    .then(resultado => {
                        let oldPath = undefined
                        if (resultado[0] !== undefined) {
                            if ((resultado[0]['formacoesAcademicas']['pathArquivo'] !== undefined)) {
                                oldPath = resultado[0]['formacoesAcademicas']['pathArquivo']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoAcademicFormations.updateAcademicFormation(content)
                            .then(resultado => resp.json(resultado))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerAcademicFormation()