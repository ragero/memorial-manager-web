const daoPublications = require('../daos/daoPublications')
const { validationResult } = require('express-validator')

class ControlerPublication {

    routes() {
        return {
            base: '/app/publications',
            baseID: `/app/publications/:id`
        }
    }

    addPublication() {
        return function (req, resp) {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['pathArquivo'] = req.file.path
                }
                daoPublications.addPublication(req.user, content)
                    .then(resultado => resp.json(resultado))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getPublications() {
        return function (req, resp) {
            daoPublications.getPublications(req.user)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    removePublication() {
        return function (req, resp) {
            console.log('Body=====')
            console.log(req.body)
            console.log(req.params)
            daoPublications.removePublication(req.user.email, req.params.id)
                .then(resultado => resp.json(resultado))
                .catch(erro => resp.json(erro))
        }
    }

    getPublication() {
        return function (req, resp) {
            resp.send('Get publications')
        }
    }

    updatePublication() {
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
                daoPublications.updatePublication(content)
                    .then(resultado => resp.json(resultado))
                    .catch(erro => resp.json(erro))
            }
        }
    }



}

module.exports = new ControlerPublication()