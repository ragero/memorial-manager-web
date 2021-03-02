const validators = require('../baseModel')

class ComplementaryFormationsModel {

    validations() {
        return [
            [
                validators['course'],
                validators['institution'],
                validators['workload'],
                validators['yearEnd'],
                
                validators['proof']
            ]
        ]
    }

}

module.exports = new ComplementaryFormationsModel()

