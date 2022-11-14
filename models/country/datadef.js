const Sequelize = require('sequelize');

module.exports = {
    table: 'countries',
    modelName: 'Country',
    attrs: {
        name: {
            type: Sequelize.STRING,
        },
        code: {
            type: Sequelize.STRING,
        }
    }
}
