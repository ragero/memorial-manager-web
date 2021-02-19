const fs = require('fs')
const daoAcademicFormations = require('../../daos/formation/daoAcademicFormations')
const { validationResult } = require('express-validator')

class ControlerAdademicFormation {

    routes() {
        return {
            base: '/app/academicFormations',
            baseID: `/app/academicFormations/:id`
        }
    }

    addAdademicFormation() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['pathArquivo'] = req.file.path
                }
                daoAcademicFormations.addAdademicFormation(req.user, content)
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

    removeAdademicFormation() {
        return function (req, resp) {
            daoAcademicFormations.removeAdademicFormation(req.user.email, req.params.id)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    updateAdademicFormation() {
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
                daoAcademicFormations.getAdademicFormation(req.user, req.body._id)
                    .then(resultado => {
                        let oldPath = undefined
                        if (resultado[0] !== undefined) {
                            if ((resultado[0]['formacoesAcademicas']['pathArquivo'] !== undefined)) {
                                oldPath = resultado[0]['formacoesAcademicas']['pathArquivo']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoAcademicFormations.updateAdademicFormation(content)
                            .then(resultado => resp.json(resultado))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerAdademicFormation()