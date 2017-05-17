const config = require('config');
const moment = require('moment');
const app = require('./server');
require('moment-timezone');

moment.tz.setDefault('Asia/Shanghai');
const version = require('./package').version;

const env = process.env.NODE_ENV ? `[${process.env.NODE_ENV}] ` : '';
app.create(env, version, config);
