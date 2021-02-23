const fs = require('fs')
const daoExtensionProjects = require('../../daos/extension/daoExtensionProjects')
const { validationResult } = require('express-validator')

class ControlerExtensionProject {

    routes() {
        return {
            base: '/app/extensionProjects',
            baseID: `/app/extensionProjects/:id`
        }
    }

    addExtensionProject() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['filePath'] = req.file.path
                }
                daoExtensionProjects.addExtensionProject(req.user, content)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getExtensionProjects() {
        return function (req, resp) {
            daoExtensionProjects.getExtensionProjects(req.user)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    removeExtensionProject() {
        return function (req, resp) {
            daoExtensionProjects.removeExtensionProject(req.user.email, req.params.id)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    updateExtensionProject() {
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
                daoExtensionProjects.getExtensionProject(req.user, req.body._id)
                    .then(result => {
                        let oldPath = undefined
                        if (result[0] !== undefined) {
                            if ((result[0]['projetosExtensao']['filePath'] !== undefined)) {
                                oldPath = result[0]['projetosExtensao']['filePath']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoExtensionProjects.updateExtensionProject(content)
                            .then(result => resp.json(result))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerExtensionProject()