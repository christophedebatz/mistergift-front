const express = require('express');
const logger = require('./logger');

const frontend = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';

const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// Initialize frontend middleware that will serve your JS app
const webpackConfig = isDev
  	? require('../webpack/webpack.dev.babel')
  	: require('../webpack/webpack.prod.babel');

app.use(frontend(webpackConfig));

const port = (process.env.PORT || 3000);

app.listen(port);
