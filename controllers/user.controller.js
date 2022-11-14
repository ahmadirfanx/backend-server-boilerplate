const BaseControler = require('./base/base.controller')

class User extends BaseControler {

    constructor(req = {}, res = {}, params = {}) {
        super(req, res, { ...params, module: 'user' });
    }

    /** Authenticates existing user in the system */
    async login(req = {}, res = {}, opts = {}) {
        try {
            req.body.password = CRYPTO.decrypt(req.body.password, true)

            /** Token is equal to Token + digest(email). Appending email digest ensure uniqueness */
            req.body.token = (TOKEN_SERVICE.generateToken() + CRYPTO.generateHash(req.body.email))

            /** encryptees password by generating hash */
            req.body.password = CRYPTO.generateHash(req.body.password)

            /** creates the instance in DB */
            await this.model.create(req.body)

            /** sends activation email */
            const emailBody = 'Please click on the link below to activate your account:\n' + process.env.CLIENT_DOMAIN + '/user/auth/activate/' + req.body.token

            /** Sends the mail for Activation */
            const mailStatus = await MAILER.send(req.body.email, 'Account Activation Link', emailBody)

            /** Send success response */
            return MESSAGES.SUCCESSFUL_CREATE
        } catch (error) {
            LOGGER.logError(error)
            if (error.errors[0].message) {
                return MESSAGES.USER_ALREADY_EXIST
            } else {
                return error;
            }
        }
    }

    /** Resets the authentication token for the existing user */
    async resetPassword(req = {}, res = {}, opts = {}) {
        try {
            if (!req.body.password)
                return MESSAGES.BAD_REQUEST

            // decode token
            req.params.token = URL.decode(req.params.token)

            // get user by token
            const user = await this.model.findOne({ where: { token: req.params.token } })

            if (user != null) {

                // generate new token to send via email
                const NEW_TOKEN = TOKEN_SERVICE.generateToken() + CRYPTO.generateHash(user.email)

                // refresh token and password
                user.token = NEW_TOKEN

                user.password = CRYPTO.generateHash(CRYPTO.decrypt(req.body.password))

                // save user token
                await user.save()

                // send success message only if email sent successfully
                return MESSAGES.SUCCESSFUL_RESET_PASSWORD;
            } else {
                return MESSAGES.INVALID_TOKEN;
            }

        } 
        catch (error) {
            LOGGER.logError(error)
            return error;
        }
    }
}

module.exports = User;

