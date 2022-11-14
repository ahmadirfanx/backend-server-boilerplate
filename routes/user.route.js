// const EXPRESS = require('express')
// const ROUTER = EXPRESS.Router()
// const CONTROLLER_NAME = require('../controllers/index.controller').user
// const MIDDLEWARE = require('../middleware/middleware.service')

// // Create
// ROUTER.post('/', MIDDLEWARE.validateJWT, CONTROLLER_NAME.create)

// // Login
// ROUTER.post('/auth/email', MIDDLEWARE.validateLogin, CONTROLLER_NAME.login)

// // Activate
// ROUTER.post('/auth/activate/:token', CONTROLLER_NAME.activate)

// // Reset Password Mail
// ROUTER.post('/auth/sendResetPasswordEmail', CONTROLLER_NAME.sendResetPasswordEmail)

// // Reset Password
// ROUTER.post('/auth/reset/:token', CONTROLLER_NAME.resetPassword)

// // Update
// ROUTER.patch('/:id', MIDDLEWARE.validateJWT, CONTROLLER_NAME.updateById)

// // Get All
// ROUTER.get('/', CONTROLLER_NAME.getAll)

// // Get By ID
// ROUTER.get('/:id', MIDDLEWARE.validateJWT, CONTROLLER_NAME.getById)

// // Delete
// ROUTER.delete('/', MIDDLEWARE.validateJWT, CONTROLLER_NAME.delete)

// module.exports = ROUTER

class UserRoute {
    getRoutes() {
        return ([
            {
                method: 'post',
                path: '/auth/email',
                middlewares: [

                ]
            },
            {
                method: 'post',
                path: '/',
                middlewares: [
                    
                ]
            },
            {
                method: 'post',
                path: '/auth/activate/:token',
                middlewares: [
                    
                ]
            },
            {
                method: 'post',
                path: '/auth/sendResetPasswordEmail',
                middlewares: [
                    
                ]
            },
            {
                method: 'post',
                path: '/auth/reset/:token',
                middlewares: [
                    
                ]
            },
            {
                method: 'patch',
                path: '/:id',
                middlewares: [
                    
                ]
            },
            {
                method: 'delete',
                path: '/',
                middlewares: [
                    
                ]
            },
        ])
    }

    async login(req, res, next) {
        try {

            const module = req.params.module || false
            let controller = BaseControler.getController(module, req, res);
            const response = await controller.login(req.body);

            return response
        }
        catch (error) {
            next(error)
        }
    }

    async resetPassword(req, res, next) {
        try {

            const module = req.params.module || false
            let controller = BaseControler.getController(module, req, res);
            const response = await controller.resetPassword(req);

            return response
        }
        catch (error) {
            next(error)
        }
    }



    /** Returns a Singleton instance of the API class */
    static getInstance() {
        if (!UserRoute.instance) {
            UserRoute.instance = new UserRoute();
        }
        return UserRoute.instance;
    }
}

module.exports = UserRoute.getInstance();
