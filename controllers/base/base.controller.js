const path = require('path')
const fs = require('fs')

/**
 * Base Controller class that handles the generic operations for all Children Controllers and can be overriden in Children
 */
class BaseControler {

    /** Static list of all controllers to ensure that a Singleton instance is created for all controllers */
    static controllers = {};

    /** Creates an instance of the Parent controller and Model and registers it onto the respective Module  */
    constructor(req = {}, res = {}, params = {}) {
        this.req = req
        this.res = res
        this.params = params

        if (!params.module) throw Error(`Module ${params.module} is not defined`)

        /** Fetches the Model class of the respective module */
        const modelRegistryPath = path.join(__dirname, `../../models/${params.module}/${params.module}.js`)
        let modelClass = require(modelRegistryPath)

        this.focus = new modelClass();
    }

    /**
     * Static method to get the controller instance of the required module
     * Throws error if module not found or module name does not exist
     * @param {string} moduleName 
     * @param {object} req 
     * @param {object} res 
     */
    static getController(moduleName, req = {}, res = {}) {
        try {
            if (!BaseControler.controllers[moduleName]) {

                const controllerFilePath = path.join(__dirname, `../${moduleName}.controller.js`);

                let controller = {}

                if (moduleName && fs.existsSync(`${controllerFilePath}`)) {
                    controller = require(controllerFilePath)
                }
                else throw new Error(`Invalid module "${moduleName}"`);

                /** creates an instance of the requested controller */
                const controllerInstance = new controller({
                    req: req.body,
                    params: req.params
                })

                BaseControler.controllers[moduleName] = controllerInstance;
            }
            return BaseControler.controllers[moduleName];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Controller method to handle the Create request for module
     * @param {object} data 
     * @param {object} opts 
     */
    async create(data, opts = {}) {
        try {
            let result = await this.focus.create(data, opts)
            return result;
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * Controller method to handle the Update request for module
     * @param {object} data 
     * @param {object} opts 
     */
    async update(data, opts = {}) {
        try {
            let result = await this.focus.update(data, opts)
            return result;
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * Controller method to handle the Get by ID request for module
     * @param {object} data 
     * @param {object} opts 
     */
    async fetchById(data, opts = {}) {
        try {
            let result = await this.focus.retrieveById(data, opts)
            return result;
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * Controller method to handle the Get All request for module
     * @param {object} data 
     * @param {object} opts 
     */
    async fetchAll(opts = {}) {
        try {
            let result = await this.focus.retrieveAll(opts)
            return result;
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * Controller method to handle the Delete request for module
     * @param {object} data 
     * @param {object} opts 
     */
    async delete(data, opts = {}) {
        try {
            let result = await this.focus.delete(data, opts)
            return result;
        }
        catch (err) {
            throw err;
        }
    }

}

module.exports = BaseControler;