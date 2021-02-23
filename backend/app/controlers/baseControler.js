const fs = require('fs')
const { validationResult } = require('express-validator')

class BaseControler {

    constructor(dao){
        this.dao = dao 
    }

    add() {
        return (req, resp) => {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                const content = { ...req.body }
                if (req.file !== undefined) {
                    content['filePath'] = req.file.path
                }
                this.dao.add(req.user, content)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    getAll() {
        return (req, resp) => {
            this.dao.getAll(req.user)
                .then(result => resp.json(result))
                .catch(erro => resp.json(erro))
        }
    }

    remove() {
        return (req, resp) => {
            this.dao.get(req.user, req.params.id)
                .then(result => {
                    if (result !== undefined) {
                        const data = result['formation']['professionalActivities']
                        if (!((data['filePath'] === undefined) || (data['filePath'] === ''))) {
                            fs.unlink(`./${data['filePath']}`, err => { console.log('===========\n==========\n===========', err) })
                        }
                    }
                    this.dao.remove(req.user.email, req.params.id)
                        .then(result => resp.json(result))
                        .catch(erro => resp.json(erro))
                })
                .catch(erro => resp.json({ erro }))

        }
    }

    update() {
        return (req, resp) => {
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
                this.dao.get(req.user, req.body._id)
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
                        this.dao.update(content)
                            .then(result => resp.json(result))
                            .catch(erro => resp.json(erro))
                    })
                    .catch(erro => resp.json({ erro }))
            }
        }
    }



}

module.exports = BaseControler