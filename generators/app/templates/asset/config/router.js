const config = require('config');

module.exports = {
  path: config.prefix,
  routes: [
    {
      path: '/login',
      method: 'post',
      match: 'user.login',
      validate: 'login',
    },
    {
      path: '/logout',
      method: 'post',
      match: 'user.logout',
    },
    {
      path: '/user',
      method: 'post',
      match: 'user.create',
      validate: 'register',
    },
    {
      path: '/user',
      routes: [
        {
          path: '/',
          match: 'user.get',
          filters: ['userParse'],
        },
      ],
      filters: ['auth'],
      inherit: true,
    },
  ],
};
