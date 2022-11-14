const BaseControler = require('./base/base.controller')

class Country extends BaseControler {
    
    constructor(req = {}, res = {}, params = {}) {
        super(req, res, {...params, module: 'country'});
    }
}
module.exports = Country;