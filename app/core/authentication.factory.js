(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('authFactory', authFactory);

  authFactory.$inject = ['apiUrl', '$http', '$q', 'localStorageService'];

  /* @ngInject */
  function authFactory(apiUrl, $http, $q, localStorageService) {
    var service = {
      initialize: initialize,
      register: register,
      login: login,
      isAuth: false,
      logout: logout,
      username: ''
    };

    return service;

    ////////////////

    function initialize() {
      var authData = localStorageService.get('authorizationData');
      if (authData) {
        service.isAuth = true;
        service.username = authorizationData.username;
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
            username: username
          });
          service.isAuth = true;
          service.username = username;
          return response.data;
        });
    }

    function logout() {
      localStorageService.remove('authorizationData');
      service.isAuth = false;
      service.username = '';
    }
  }
})();
