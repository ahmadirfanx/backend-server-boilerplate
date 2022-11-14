const FS = require('fs')
const path = require('path')
const EXPRESS = require('express')

/**
 * This class mounts all the routes and middlewares dynamically for the server
 */
class RoutesHandler {

    static instance = null;
    static routes = [];

    /** Returns a Singleton instance of the Handler class */
    static getInstance() {
        if (!RoutesHandler.instance) {
            RoutesHandler.instance = new RoutesHandler();
            RoutesHandler.routes = [];
        }
        return RoutesHandler.instance;
    }

    /**
     * Mounts all routes for the app onto the Router
     * @param {Express App} app 
     * @param {Express Router} router 
     */
    async mountRoutes(app) {

        const Router = this.initiateRouter()
        await this.getAllRoutes()

        RoutesHandler.routes.forEach(route => {

            const method = route.method || false;
            const path = route.path
            const middlewares = route.middlewares

            if (!method) throw Error(`Unable to mount invalid method ${method}`)

            /** Binds the Send Response method on the return of last middleware method to return the response back to client */
            middlewares[middlewares.length - 1] = this.sendResponse(middlewares[middlewares.length - 1])

            /** dynamically mounts path and all middlewares onto the Router */
            Router[method](path, ...middlewares)
        })

        app.use('/api', Router)
    }

    /**
     * parses all routes from route folder pushes them into the routes array in the format
     * [ {method: 'post', path: '/route1/path1', middlewares: [Middleware1, Middleware2, ..., MiddlewareN]}, ...]
     */
    async getAllRoutes() {

        const exemptedFiles = ['index.js']

        /** Iterates through thr foler of Routes */
        FS.readdirSync('./routes').forEach(function (file) {

            /** checks for subdirectories if any */
            if (file.includes('.js')) {

                /** checks for all files except exempted files */
                if (!exemptedFiles.includes(file)) {

                    const routeRegistryPath = path.join(__dirname, `../routes/${file}`);
                    const api = require(routeRegistryPath)
                    Array.prototype.push.apply(RoutesHandler.routes, api.getRoutes());
                }
            }
        })
    }

    /**
     * Initiates the instance of Express Router
     * @param {Express App} app 
     * @returns 
     */
    initiateRouter() {
        let router = EXPRESS.Router();
        return router;
    }

    /**
     * Method to return the response of the middleware method passed to it.
     * @param {funtion} middleware_method 
     * @returns Response of the API call
     */
    sendResponse(middleware_method) {
        return async (req, res, next) => {
            const result = await middleware_method(req, res, next)
            if (result)
                res.send(result)
        }
    }

}

module.exports = RoutesHandler.getInstance()