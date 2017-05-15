(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('chartsFactory', chartsFactory);

  chartsFactory.$inject = ['$http', 'apiUrl'];

  /* @ngInject */
  function chartsFactory($http, apiUrl) {
    var service = {
      getTodaysDroplists: getTodaysDroplists,
      getDroplistItems: getDroplistItems
    };

    return service;

    function getTodaysDroplists() {
      return $http
        .get(apiUrl + 'getTodaysDroplists')
        .then(function(response) {
          return response.data;
        });
    }

    function getDroplistItems() {
      return $http
        .get(apiUrl + 'getDroplistItems')
        .then(function(response) {
          return response.data;
        });
    }
  }
})();
