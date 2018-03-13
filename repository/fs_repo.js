const fs = require('firebase-admin');

var serviceAccount = require('../fs_apiKey.json');

fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

module.exports = fs;