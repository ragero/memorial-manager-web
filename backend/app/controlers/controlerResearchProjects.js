const fs = require('fs')
const daoResearchProjects = require('../daos/daoResearchProjects')
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
                    content['pathArquivo'] = req.file.path
                }
                daoResearchProjects.addResearchProject(req.user, content)
                    .then(resultado => resp.json(resultado))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getResearchProjects() {
        return function (req, resp) {
            daoResearchProjects.getResearchProjects(req.user)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    removeResearchProject() {
        return function (req, resp) {
            daoResearchProjects.removeResearchProject(req.user.email, req.params.id)
                .then(resultado => resp.json(resultado))
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
                    content['pathArquivo'] = req.file.path
                } else {
                    delete content['comprovante']
                }
                daoResearchProjects.getResearchProject(req.user, req.body._id)
                    .then(resultado => {
                        let oldPath = undefined
                        if (resultado[0] !== undefined) {
                            if ((resultado[0]['projetosPesquisa']['pathArquivo'] !== undefined)) {
                                oldPath = resultado[0]['projetosPesquisa']['pathArquivo']
                            }
                        }
                        fs.unlink(`./${oldPath}`, err => { console.log('===========\n==========\n===========', err) })
                        daoResearchProjects.updateResearchProject(content)
                            .then(resultado => resp.json(resultado))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = new ControlerResearchProject()