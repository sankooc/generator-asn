import angular from "angular";
import * as _ from "lodash";

const lang = require("../lang");

const app = angular.module("app");

const prefix = "/api";

app.service("$userService", function us($http, $window, $q) {
  let user;
  this.get = () => {
    return $http.get(`${prefix}/user`).then(rs => {
      const _user = rs.data;
      return _user;
    });
  };
  this.logout = () => {
    user = null;
    return $http.post(`${prefix}/logout`);
  };
  this.login = (cellphone, password) =>
    $http
      .post(`${prefix}/login`, { cellphone, password })
      .then(() => this.get(true));

  this.register = option => $http.post(`${prefix}/user`, option);
});
