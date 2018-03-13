const { Router } = require('express');
const router = new Router();

const service = require('./users-service');

router.route('/')
        .post((...args) => service.create(...args));

router.route('/:id')
        .get((...args) => service.find(...args));

module.exports = router;