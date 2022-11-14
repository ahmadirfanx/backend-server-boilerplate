const { registerDecorator } = require('handlebars');
const BaseControler = require('../controllers/base/base.controller');

class BaseAPI {

    getRoutes() {
        return (
            [
                {
                    method: 'post',
                    path: '/:module',
                    middlewares: [
                        this.createRecord.bind(this)
                    ]
                },
                {
                    method: 'get',
                    path: '/:module/:id',
                    middlewares: [
                        this.fetchRecord.bind(this)
                    ]
                },
                {
                    method: 'get',
                    path: '/:module',
                    middlewares: [
                        this.fetchAll.bind(this)
                    ]
                },
                {
                    method: 'patch',
                    path: '/:module/:id',
                    middlewares: [
                        this.updateRecord.bind(this)
                    ]
                },
                {
                    method: 'delete',
                    path: '/:module/:id',
                    middlewares: [
                        this.delete.bind(this)
                    ]
                }
            ]
        )
    }


    /**
     * Creates an instance of the requested module and throws an error if module not defined.
     * @param {Request} req 
     * @param {Response} res 
     * @param {Response Callback} next 
     */
    async createRecord(req, res, next) {
        try {

            const module = req.params.module || false
            let controller = BaseControler.getController(module, req, res);
            const response = await controller.create(req);

            return response
        }
        catch (error) {
            next(error)
        }
    }

    /**
     * Creates an instance of the requested module and throws an error if module not defined.
     * @param {Request} req 
     * @param {Response} res 
     * @param {Response Callback} next 
     */
     async fetchRecord(req, res, next) {
        try {
            let body = {...req.body, id: req.params.id}
            const module = req.params.module || false
            let controller = BaseControler.getController(module, req, res);
            const response = await controller.fetchById(req);

            return response
        }
        catch (error) {
            next(error)
        }
    }

    /**
     * Creates an instance of the requested module and throws an error if module not defined.
     * @param {Request} req 
     * @param {Response} res 
     * @param {Response Callback} next 
     */
     async fetchAll(req, res, next) {
        try {

            const module = req.params.module || false
            let controller = BaseControler.getController(module, req, res);
            const response = await controller.fetchAll(req);

            return response
        }
        catch (error) {
            next(error)
        }
    }

    /**
     * Creates an instance of the requested module and throws an error if module not defined.
     * @param {Request} req 
     * @param {Response} res 
     * @param {Response Callback} next 
     */
     async updateRecord(req, res, next) {
        try {
            const module = req.params.module || false
            let controller = BaseControler.getController(module, req, res);

            const response = await controller.update(req);

            return response
        }
        catch (error) {
            next(error)
        }
    }

    /**
     * Creates an instance of the requested module and throws an error if module not defined.
     * @param {Request} req 
     * @param {Response} res 
     * @param {Response Callback} next 
     */
     async delete(req, res, next) {
        try {
            let body = {...req.body, id: req.params.id}
            const module = req.params.module || false
            let controller = BaseControler.getController(module, req, res);
            const response = await controller.delete(req);

            return response
        }
        catch (error) {
            next(error)
        }
    }

    /** Returns a Singleton instance of the API class */
    static getInstance() {
        if (!BaseAPI.instance) {
            BaseAPI.instance = new BaseAPI();
        }
        return BaseAPI.instance;
    }
}

module.exports = BaseAPI.getInstance();