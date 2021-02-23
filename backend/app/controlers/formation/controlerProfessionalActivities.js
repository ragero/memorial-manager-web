const fs = require('fs')
const daoProfessionalActivities = require('../../daos/formation/daoProfessionalActivities')
const { validationResult } = require('express-validator')

class ControlerProfessionalActivity {

    routes() {
        return {
            base: '/app/formation/professional_activities',
            baseID: `/app/formation/professional_activities/:id`
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
                    content['filePath'] = req.file.path
                }
                daoProfessionalActivities.add(req.user, content)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getProfessionalActivities() {
        return function (req, resp) {
            daoProfessionalActivities.getAll(req.user)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    removeProfessionalActivity() {
        return function (req, resp) {
            daoProfessionalActivities.get(req.user, req.params.id)
                .then(result => {
                    if (result !== undefined) {
                        const data = result['formation']['professionalActivities']
                        if (!((data['filePath'] === undefined) || (data['filePath'] === ''))) {
                            fs.unlink(`./${data['filePath']}`, err => { console.log('===========\n==========\n===========', err) })
                        }
                    }
                    daoProfessionalActivities.remove(req.user.email, req.params.id)
                        .then(result => resp.json(result))
                        .catch(erro => resp.json(erro))
                })
                .catch(erro => resp.json({ erro }))

        }
    }

    updateProfessionalActivity() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined || req.file === '') {
                    content['filePath'] = req.file.path
                } else {
                    delete content['proof']
                }
                daoProfessionalActivities.get(req.user, req.body._id)
                    .then(result => {
                        let oldPath = undefined
                        if (result !== undefined) {
                            console.log('Imprimindo o results!= =====================')
                            const data = result['formation']['professionalActivities']
                            if ((data['filePath'] !== undefined)) {
                                oldPath = data['filePath']
                                if ((content['filePath'] === undefined) || (content['filePath'] === '')) {
                                    content['filePath'] = oldPath
                                } else {
                                    fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                                }
                            }
                        }
                        daoProfessionalActivities.update(content)
                            .then(result => resp.json(result))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerProfessionalActivity()