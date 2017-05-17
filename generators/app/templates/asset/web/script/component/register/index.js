require('./tpl.html');

module.exports = ($scope, $userService, $state, $q, $timeout, $interval) => {
  $scope.cellphone = '';
  $scope.password = '';
  $scope.issending = false;
  $scope.sendable = true;
  $scope.register = (cellphone, password, rp) => {
    if (cellphone && password && rp) {
      if (password !== rp) {
        return $q.reject('两次密码输入不一致');
      }
      return $userService.register({ cellphone, password }).then(() => {
        $state.go('tab.login');
      });
    }
    return $q.reject('empty');
  };
};
