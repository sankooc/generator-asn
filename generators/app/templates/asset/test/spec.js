const should = require('should');
const UModel = require('../server/model/user').model;
const dao = require('../server/dao');
const co = require('co');
const router = require('../server/route');
const assert = require('assert');

const ick = fn => (done) => {
  co(fn).then(done, done);
};

const th = function* aynctest(fn, msg) {
  yield co(fn)
    .then(() => {
      assert.fail('', '', `must throw :[${msg}]`, '');
    })
    .catch((e) => {
      should(e.message).be.exactly(msg);
    });
};

describe('spec', () => {
  beforeEach((done) => {
    co(function* beforeHandle() {
      yield dao.user.removeAll();
    }).then(done, done);
  });
  it(
    'test',
    ick(function* c() {
      const user = {
        cellphone: '123',
        password: '2314',
      };
      const session = {
        save: () => {},
      };
      const u = yield router.user.create({ body: user });
      should(u.cellphone).be.exactly('123');
      const uid = u._id.toString();
      let aid;
    })
  );
});
