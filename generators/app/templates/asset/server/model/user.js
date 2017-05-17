const ObjectId = require('mongodb').ObjectID;
const _ = require('lodash');

class Model {
  constructor(id, dao, service) {
    this.id = id;
    this.dao = dao;
    this.service = service;
  }
  * get(uid) {
    const id = uid || this.id;
    return yield this.dao.user.get(id);
  }
}

exports.model = Model;
