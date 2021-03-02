const validators = require('../baseModel')

class AcademicFormationsModel {

    validations() {
        return [
            [
                validators['degree'],
                validators['course'],
                validators['institution'],
                validators['yearBegin'],
                validators['yearEnd'],
                
                validators['proof']
            ]
        ]
    }

}

module.exports = new AcademicFormationsModel()

