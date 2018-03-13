const express = require('express');

const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const routes = require('./routes');
const config = require('./config');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/', routes);

app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`);
});