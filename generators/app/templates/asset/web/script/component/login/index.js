require('./tpl.html');

module.exports = ($scope, $userService, $state) => {
  $scope.doLogin = (cellphone, password) => {
    $userService.login(cellphone, password).then(() => {
      $state.go('tab.home',{}, { reload: true });
    });
  };
};
