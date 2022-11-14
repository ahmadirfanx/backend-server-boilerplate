const { sequelize } = require('../dbManager/db');

/**
 * Parent Base Model class which performs all generic DB and Model related operations.
 * Methods can be overriden in Children Models.
 */
class BaseModel {

    static instances = {};

    static relationships = {};

    constructor(opts = {}) {
        this.module = this.constructor.name.toString().toLowerCase();
        return this.getInstance({ ...opts, moduleName: this.module });
    }

    getInstance(options = {}) {
        BaseModel.instances = BaseModel.instances || {};

        /** fetches data model name, table name and data definition attributes */
        let { table = false, modelName = false, attrs = {} } = require(`./${this.module}/datadef`)

        try {
            /** If an instance isn't present already, it creates a new instance and adds relationships onto it */
            if (!BaseModel.instances[this.module]) {

                this.model = sequelize.define(modelName, attrs)
                BaseModel.instances[this.module] = this

                this.addAssociations();
            }
            return BaseModel.instances[this.module];
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Method to add associations to the Models
     * @returns 
     */
    addAssociations() {
        /** Returns if the Realtionships have already been created for the module */
        if (!!BaseModel.relationships[this.module]) return;

        let relationships = require(`./${this.module}/relationships`)

        BaseModel.relationships[this.module] = relationships;

        /** Iterates throguh all relationships in the Module and creates associations */
        relationships.forEach(relMeta => {

            /** Parses Relationship Metadata*/
            let { relationship, model, as, foreignKey } = relMeta

            model = this.getModel(model)

            /** Adds association */
            this.model[relationship](model, { as, foreignKey })
        })

    }

    /**
     * It returns a Sequelize model of the resquested module, if not present, it creates a new one.
     * @param {string} module 
     * @param {object} opts 
     * @returns Sequelize Model
     */
    static getModel(module = false, opts = {}) {
        if (!module) throw new Error('Module name must not be empty')
        try {
            let moduleName = module.toString().toLowerCase()

            if (!BaseModel.instances[moduleName]) {
                let moduleClass = require(`./${moduleName}/${moduleName}`)
                new moduleClass(opts);
            }
            return BaseModel.instances[moduleName].model
        }
        catch (err) {
            throw new Error(`Unable to load module ${module}: ${err}`);
        }
    }

    /**
     * Creates an instance of the model in the Database.
     * @param {object} data 
     * @param {object} opts any additional paramters for filers / returning raw object
     * @returns Result Model of the instance created
     */
    async create(data, opts = {}) {

        const t = await sequelize.transaction();

        try {

            data = data.body

            let result = await this.model.create(data, { transaction: t })

            t.commit();
            return result;
        }
        catch (err) {
            t.rollback();
            throw err;
        }
    }

    /**
     * Fetches all the instances of the model from the Database.
     * @param {object} data 
     * @param {object} opts any additional paramters for filers / returning raw object
     * @returns Result Model of the instance created
     */
    async retrieveAll(data, opts = {}) {
        try {

            let params = {};

            if (!!opts.where)
                params['where']  = opts.where 
            
            let result = await this.model.findAll(params)

            return result;
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * Fetches an instances of the model from the Database
     * @param {object} data 
     * @param {object} opts any additional paramters for filers / returning raw object
     * @returns Result Model of the instance created
     */
    async retrieveById(data, opts = {}) {
        try {

            let params = {
                where: { 
                    id: data.params.id
                }
            }

            let result = await this.model.findOne(params)

            return result;
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * Updates the instance(s) of the model that calls the method from the DB
     * @param {object} data 
     * @param {object} opts any additional paramters for filers / returning raw object
     * @returns Result Model of the instance created
     */
    async update(data, opts = {}) {
        const t = await sequelize.transaction();

        try {

            let params = {
                where: { id: data.params.id}
            }

            data = data.body
            
            let result = await this.model.update(data, params, { transaction: t })

            t.commit();
            return result;
        }
        catch (err) {
            t.rollback();
            throw err;
        }
    }

    /**
     * Delete the instance(s) of the model that calls the method from the DB
     * @param {object} data 
     * @param {object} opts any additional paramters for filers / returning raw object
     * @returns Result Model of the instance created
     */
    async delete(data, opts = {}) {
        const t = await sequelize.transaction();

        try {

            let params = {
                where: { id: data.params.id}
            }
            let result = await this.model.destroy(params, { transaction: t })

            t.commit();
            return result;
        }
        catch (err) {
            t.rollback();
            throw err;
        }
    }
}

module.exports = BaseModel;

