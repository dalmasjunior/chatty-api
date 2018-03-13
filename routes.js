const { Router } = require('express');
const router = new Router();

const users = require("./paths/users/users-routes");
const messages = require("./paths/messages/messages-routes");
const message = require("./paths/messages/message-route");

router.use('/users', users);
router.use('/messages', messages);
router.use('/message', message);

module.exports = router;