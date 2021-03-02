const validators = require('../baseModel')

class ProfessionalActivitiesModel {

    validations() {
        return [
            [
                validators['role'],
                validators['institution'],
                validators['yearBegin'],
                
                validators['proof']
            ]
        ]
    }

}

module.exports = new ProfessionalActivitiesModel()

