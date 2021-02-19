const fs = require('fs')
const daoProfessionalActivities = require('../../daos/formation/daoProfessionalActivities')
const { validationResult } = require('express-validator')

class ControlerProfessionalActivity {

    routes() {
        return {
            base: '/app/professionalActivities',
            baseID: `/app/professionalActivities/:id`
        }
    }

    addProfessionalActivity() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['pathArquivo'] = req.file.path
                }
                daoProfessionalActivities.addProfessionalActivity(req.user, content)
                    .then(resultado => resp.json(resultado))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getProfessionalActivities() {
        return function (req, resp) {
            daoProfessionalActivities.getProfessionalActivities(req.user)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    removeProfessionalActivity() {
        return function (req, resp) {
            daoProfessionalActivities.removeProfessionalActivity(req.user.email, req.params.id)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    updateProfessionalActivity() {
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
                daoProfessionalActivities.getProfessionalActivity(req.user, req.body._id)
                    .then(resultado => {
                        let oldPath = undefined
                        if (resultado[0] !== undefined) {
                            if ((resultado[0]['apresentacoes']['pathArquivo'] !== undefined)) {
                                oldPath = resultado[0]['apresentacoes']['pathArquivo']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoProfessionalActivities.updateProfessionalActivity(content)
                            .then(resultado => resp.json(resultado))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerProfessionalActivity()