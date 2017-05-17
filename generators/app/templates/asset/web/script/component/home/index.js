require('./tpl.html');

module.exports = ($scope, $state) => {
  $scope.doLogin = (cellphone, password) => {
    // $userService.login(cellphone, password).then(() => {
    //   $scope.updateCurrentUser(true);
    //   $state.go('tab.home');
    // });
  };
};
