const dao = require('../dao');

exports.create = context => dao.user.create(context.body);

exports.login = function* _login(context) {
  const option = context.body;
  const user = yield dao.user.login(option);
  context.session.uid = user._id.toString();
  context.session.save();
  return user;
};

exports.logout = (context) => {
  context.session.uid = null;
  context.session.save();
  return {};
};

exports.get = context => context.userModel.get();
