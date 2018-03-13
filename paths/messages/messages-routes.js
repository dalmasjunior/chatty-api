const { Router } = require('express');
const router = new Router();

const service = require('./messages-service');

router.route('/')
        .post((...args) => service.send(...args));

router.route('/:to')
        .get((...args) => service.getMessagesTo(...args));

module.exports = router;