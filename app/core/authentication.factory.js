(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('authFactory', authFactory);

  authFactory.$inject = ['apiUrl', '$http', '$q', 'localStorageService', '$rootScope'];

  /* @ngInject */
  function authFactory(apiUrl, $http, $q, localStorageService, $rootScope) {
    var service = {
      initialize: initialize,
      register: register,
      login: login,
      isAuth: false,
      logout: logout,
      username: '',
      role: '',
      userId: ''
    };

    return service;

    ////////////////

    function initialize() {
      var authData = localStorageService.get('authorizationData');
      if (authData) {
        service.isAuth = true;
        service.username = authData.username;
        service.role = authData.role;
        service.userId = authData.userId;
      }
    }

    function register(registration) {
      logout();
      var defer = $q.defer();

      $http
        .post(apiUrl + 'register', registration)
        .then(function(response) {
            defer.resolve(response.data);
          },
          function(error) {
            console.error(error);
            defer.reject(error);
          }
        );
      return defer.promise;
    }

    function login(username, password) {
      logout();

      var data = "grant_type=password&username=" + username + "&password=" + password;
      // var defer = $q.defer();

      return $http
        .post(apiUrl + 'users/login', data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(function(response) {
          localStorageService.set('authorizationData', {
            token: response.data.access_token,
            username: response.data.username,
            role: response.data.role,
            userId: response.data.userId
          });
          service.isAuth = true;
          service.username = response.data.username;
          service.role = response.data.role;
          service.userId = response.data.userId;

          $rootScope.$broadcast('login-happened', {
            username: response.data.username,
            role: response.data.role,
            userId: response.data.userId
          });

          return response.data;
        });
    }

    function logout() {
      localStorageService.remove('authorizationData');
      service.isAuth = false;
      service.username = '';
      service.role = '';
      service.userId = '';
    }
  }
})();
