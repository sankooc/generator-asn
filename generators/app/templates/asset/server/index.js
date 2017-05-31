const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mroute = require('routs');
const rconfig = require('../config/router.js');
const validators = require('../config/validator.js');
const routes = require('./route');
const filters = require('./midware/filter');
const lang = require('../config/lang');
const CError = require('./CError');
const path = require('path');

exports.create = (evn, version, config) => {
  const app = express();
  app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: 'name',
    })
  );
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    const ip = req.ip;
    req.logger = {
      log: function _log(...args) {
        args.unshift(ip);
        console.log(...args);
      },
      err: function _err(...args) {
        args.unshift(ip);
        console.error(...args);
      },
    };
    next();
  });

  app.enable('trust proxy');


  const routsOption = { routes, filters, validators };

  mroute.express(app, rconfig, routsOption);

  app.use((err, req, res, next) => {
    const type = typeof err;
    if (type === 'number') {
      return res.status(err).end();
    }
    if (err instanceof Error) {
      if (err.message !== 'NEED_LOGIN') {
        console.error(err);
      }
      let _code = 400;
      if (err instanceof CError) {
        _code = err.code || 400;
      }
      const message = lang[err.message] || err.message;
      return res.status(_code).json({ message });
    }
    if (type === 'object') {
      let { status, message } = err;
      status = status || 400;
      message = message || lang.ERR_OCCUR;
      return res.status(status).json({ message });
    }
    if (type === 'string') {
      const status = 400;
      const message = err || lang.ERR_OCCUR;
      return res.status(status).json({ message });
    }
    if (next) {
      console.error(err);
    }
    return res.status(400).end();
  });

  app.use(express.static(path.join(__dirname, '../build')));

  app.listen(config.port, () => {
    console.log(
      `time: [${new Date()}] evn: [${evn}] version: [v${version}] listening on port: [${config.port}]`
    );
    process.on('uncaughtException', (err) => {
      console.error('Caught exception:', err.stack);
    });
    process.on('unhandledRejection', (reason, p) => {
      console.error(
        'Unhandled Rejection at: Promise ',
        p,
        'reason: ',
        reason.stack
      );
    });
  });
};
