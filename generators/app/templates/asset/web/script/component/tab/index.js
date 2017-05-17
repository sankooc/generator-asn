require('./tpl.html');
const _ = require('lodash');

module.exports = ($scope, $userService, $state) => {
  $scope.loaded = false;
  $scope.isLogin = false;
  const init = () => {
    $userService.get().then((res) => {
      $scope.current = res;
      $scope.loaded = true;
      $scope.isLogin = true;
      $scope.userMenu = [
    { label: '登出', onClick: () => {
      $userService.logout();
      $state.go('tab.home', {}, { reload: true });
    }, icon: 'sign out' },
      ];
    }).catch(() => {
      $scope.loaded = true;
    });
  };
  init();
  $scope.name = 'ASN';
  $scope.userMenu = [];
  $scope.stateChange = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    if (item.state) {
      $state.go(item.state, item.param, { reload: true });
    }
  };
};
