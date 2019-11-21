/* eslint consistent-return:0 */

const express = require('express');
const bodyParser = require('body-parser');
const { resolve } = require('path');
const logger = require('./util//logger');

const argv = require('./util/argv');
const port = require('./util//port');
const setup = require('./middlewares/frontendMiddleware');
const routes = require('./routes');
const app = express();

const enableCORS = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, token, Content-Length, X-Requested-With, peiadmin, *');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200)
  }
  else {
    next()
  }
}

app.use(enableCORS);
app.use(bodyParser.json());
app.use('/api', routes);

app.all('*', (req,res,next) =>{
  const reqInfo = req.url.split('/');
  if (reqInfo[1] && reqInfo[1] == 'admin') {
    if (req.headers['peiadmin'] && req.headers['peiadmin'] == 'censo2019') {
      next();
    } else {
      res.status(404).send();
    }
  } else {
    next();
  }
})

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
