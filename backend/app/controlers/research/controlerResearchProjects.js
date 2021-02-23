const fs = require('fs')
const daoResearchProjects = require('../../daos/research/daoResearchProjects')
const { validationResult } = require('express-validator')

class ControlerResearchProject {

    routes() {
        return {
            base: '/app/researchProjects',
            baseID: `/app/researchProjects/:id`
        }
    }

    addResearchProject() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['filePath'] = req.file.path
                }
                daoResearchProjects.addResearchProject(req.user, content)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getResearchProjects() {
        return function (req, resp) {
            daoResearchProjects.getResearchProjects(req.user)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    removeResearchProject() {
        return function (req, resp) {
            daoResearchProjects.removeResearchProject(req.user.email, req.params.id)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    updateResearchProject() {
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
                daoResearchProjects.getResearchProject(req.user, req.body._id)
                    .then(result => {
                        let oldPath = undefined
                        if (result[0] !== undefined) {
                            if ((result[0]['projetosPesquisa']['filePath'] !== undefined)) {
                                oldPath = result[0]['projetosPesquisa']['filePath']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoResearchProjects.updateResearchProject(content)
                            .then(result => resp.json(result))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerResearchProject()