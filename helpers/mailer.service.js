const NODE_MAILER = require('nodemailer')
const LOGGER = require('./logger.service')
const CRYPTO = require('./crypto.service')
const MODELS = require('../models/index')

// This service is used to send out emails

module.exports = {
  // Send email method
  async send (_email, _subject, _html, _attachments) {
    // fetch mail configuration from database
    await MODELS.Mailserver.findOne({
      where: {
        isActive: true
      }
    }).then(async _config => {
      if (_config) {
        _config.password = CRYPTO.decrypt(_config.password)
        // transporter configuration
        const TRANSPORTER = NODE_MAILER.createTransport({
          host: _config.host,
          port: _config.port,
          auth: {
            user: _config.email,
            pass: _config.password
          },
          tls: {
            rejectUnauthorized: _config.isSSLTLS
          }
        })
        // Mail sender and receiver configuration
        const MAIL_OPTIONS = {
          from: _config.email,
          to: _email,
          subject: _subject,
          //text: _body
          html : _html,
          attachments: _attachments
        }
        // Send email
        await TRANSPORTER.sendMail(MAIL_OPTIONS).then(_res => {
          return true
        }).catch(_error => {
          LOGGER.logError(_error)
          console.log('----from:', MAIL_OPTIONS.from, '----To: ', MAIL_OPTIONS.to)
          throw _error
        })
      } else {
        LOGGER.logError('No Active Email Configuration Found')
        throw Error('No Active Email Configuration Found')
      }
    }).catch(_error => {
      LOGGER.logError(MAIL_OPTIONS)
      throw _error
    })
  }
}
