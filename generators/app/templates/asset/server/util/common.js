const config = require('config');
const crypto = require('crypto');

function salt() {
  return config.salt;
}

exports.generatePassword = (pwd) => {
  const _salt = salt();
  const hash = crypto
    .pbkdf2Sync(pwd, new Buffer(_salt), 1000, 32, 'sha256')
    .toString('hex');
  return `${_salt}$${hash}`;
};

exports.verifyPassword = (hmac, password) => {
  const ts = hmac.split('$');
  const _salt = ts[0];
  const token = ts[1];
  const _token = crypto
    .pbkdf2Sync(password, new Buffer(_salt), 1000, 32, 'sha256')
    .toString('hex');
  return token === _token;
};

exports.randomMD5 = () => crypto.createHash('md5').update(`${Date.now()}`).digest('hex');
