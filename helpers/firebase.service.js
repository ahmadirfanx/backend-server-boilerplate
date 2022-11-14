const serviceAccount = require('../config/fireabse-privatekey.json')
const admin = require('firebase-admin');
// const { getMessaging } = require('firebase/messaging');

/**
 * This initializes the firebase admin-sdk
 */
 const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// const messaging = getMessaging(app)

module.exports = admin;