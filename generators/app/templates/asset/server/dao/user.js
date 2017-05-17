const config = require('config');
const base = require('./base');
const _ = require('lodash');
const _util = require('../util/common');

const _url = config.mongodb.host;
const _dbname = config.mongodb.user;
const ObjectId = require('mongodb').ObjectID;

const userWrap = (user) => {
  if (user) {
    return _.omit(user, 'password');
  }
  return user;
};

class Dao extends base.Dao {
  constructor() {
    super(_url, _dbname);
  }
  * create(option) {
    console.log(option);
    const _option = _.pick(option, 'cellphone');
    _option.createDate = new Date();
    _option.lastUpdate = new Date();
    _option.password = _util.generatePassword(option.password);
    const collection = yield this.collection();
    const r = yield collection.findOneAndUpdate(
      { cellphone: option.cellphone },
      { $setOnInsert: _option },
      { upsert: true, returnOriginal: false }
    );
    if (!r.lastErrorObject.updatedExisting) {
      return userWrap(r.value);
    }
    throw new Error('USER_ALREADY_EXIST');
  }
  * reset(option) {
    const filter = { cellphone: option.cellphone };
    const doc = { password: _util.generatePassword(option.password) };
    return yield this._update(filter, doc);
  }
  * _update(selector, doc) {
    const collection = yield this.collection();
    const rt = yield collection.findOneAndUpdate(
      selector,
      { $set: doc },
      { upsert: false, returnOriginal: false }
    );
    return userWrap(rt.value);
  }
  * update(uid, option) {
    const doc = option || {};
    if (doc.password) {
      doc.password = _util.generatePassword(doc.password);
    }
    const filter = { _id: ObjectId(uid) };
    return yield this._update(filter, doc);
  }
  * find(option, sort) {
    const _sort = sort || { createDate: -1 };
    const collection = yield this.collection();
    const _items = yield collection.find(option).sort(_sort).toArray();
    const items = _items.map(userWrap);
    return items;
  }
  * login(option) {
    const { cellphone, password } = option;
    const collection = yield this.collection();
    const user = yield collection.findOne({ cellphone });
    if (user) {
      const _password = user.password;
      if (_util.verifyPassword(_password, password)) {
        return userWrap(user);
      }
      throw new Error('PASSWORD_INCORRECT');
    } else {
      throw new Error('USER_NOT_EXIST');
    }
  }
}

class Factory extends base.Factory {}

module.exports = new Factory(Dao);
