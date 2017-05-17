import angular from 'angular';

const lang = require('./lang');

const app = angular.module('app', [
  'ui.router',
  'angular-loading-bar',
  'semantic-ui',
]);
require('./service');
require('./directive');
require('./component');

app.config([
  'cfpLoadingBarProvider',
  (cfpLoadingBarProvider) => {
    cfpLoadingBarProvider.includeSpinner = false;
  },
]);
app.config(
  ($stateProvider, $urlRouterProvider, $httpProvider, $sceProvider) => {
    $sceProvider.enabled(false);
    $httpProvider.interceptors.push('authInterceptor');
    $stateProvider
      .state('tab', {
        abstract: true,
        templateUrl: 'component/tab/tpl.html',
        controller: 'tabCtr',
      })
      .state('tab.home', {
        url: '/',
        templateUrl: 'component/home/tpl.html',
        controller: 'homeCtr',
      });
    ['login', 'register'].forEach((tp) => {
      $stateProvider.state(`tab.${tp}`, {
        url: `/${tp}`,
        controller: `${tp}Ctr`,
        templateUrl: `component/${tp}/tpl.html`,
      });
    });
    return $urlRouterProvider.otherwise('/');
  }
);
app.run(($rootScope) => {
  $rootScope.title = lang.name;
});
