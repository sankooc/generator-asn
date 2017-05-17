import angular from 'angular';

const mod = angular.module('app');

const home = require('./home');
const tab = require('./tab');
const login = require('./login');
const register = require('./register');

const make = (obj) => {
  for (const name of Object.keys(obj)) {
    mod.controller(`${name}Ctr`, obj[name]);
  }
};

make({
  home, tab, login, register
});
