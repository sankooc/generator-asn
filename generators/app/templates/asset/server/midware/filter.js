const UModel = require('../model/user').model;
const dao = require('../dao');
const CError = require('../CError');

exports.auth = (req) => {
  if (!req.session.uid) {
    throw new CError(401, 'NEED_LOGIN');
  }
  req.uid = req.session.uid;
};

exports.userParse = (req) => {
  if (!req.session.uid) {
    throw new CError(401, 'NEED_LOGIN');
  }
  const uid = req.session.uid;
  req.userModel = new UModel(uid, dao, { logger: req.logger });
};
