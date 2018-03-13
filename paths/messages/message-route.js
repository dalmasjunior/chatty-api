const { Router } = require('express');
const router = new Router();

const service = require('./messages-service');

router.route('/:id')
        .get((...args) => service.getMessageById(...args));

module.exports = router;