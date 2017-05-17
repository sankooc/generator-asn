const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

class BaseDao {
  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
  }
  * _connect() {
    const { url } = this;
    if (this.db) {
      return this.db;
    }
    this.db = yield MongoClient.connect(url);
    return this.db;
  }
  * collection(col) {
    const db = yield this._connect();
    const cname = col || this.dbName;
    return db.collection(cname);
  }
  * get(id) {
    const _id = ObjectId(id);
    const collection = yield this.collection();
    return yield collection.findOne({ _id });
  }
  * _find(filter, sort) {
    const collection = yield this.collection();
    return yield collection.find(filter).sort(sort).toArray();
  }
  * _update(selector, doc) {
    const collection = yield this.collection();
    return yield collection.findOneAndUpdate(
      selector,
      { $set: doc },
      { upsert: false, returnOriginal: false }
    );
  }
  * removeAll() {
    const collection = yield this.collection();
    return yield collection.deleteMany({});
  }
}

class BaseFactory {
  constructor(Dao) {
    this.Dao = Dao;
  }
  create() {
    return new this.Dao();
  }
}

exports.Dao = BaseDao;

exports.Factory = BaseFactory;
