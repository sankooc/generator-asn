import angular from 'angular';

const app = angular.module('app');

app.service('authInterceptor', function _au($q, $window) {
  const service = this;

  service.responseError = (response) => {
    const url = response.config.url;
    if (url !== '/api/login' && url !== '/api/login') {
      if (response.status === 401) {
        window.location = '#!/login';
        return $q.reject(response);
      }
    }
    if (url === '/api/user') {
      return $q.reject(response);
    }
    if (response.data && response.data.message) {
      const message = response.data.message;
      const isIE = !!document.documentMode;
      if (isIE) {
        $window.alert(message);
      } else {
        $window.swal('发生错误', message, 'error');
      }
    }
    return $q.reject(response);
  };
});
