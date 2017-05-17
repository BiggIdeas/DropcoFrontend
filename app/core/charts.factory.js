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
      getDroplistItems: getDroplistItems,
      getHardlinesDroplistItems: getHardlinesDroplistItems,
      getCenterDroplistItems: getCenterDroplistItems,
      getFoodsDroplistItems: getFoodsDroplistItems,
      getDepartmentDroplistItems: getDepartmentDroplistItems,
      getRejectedDroplistItems: getRejectedDroplistItems
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

    function getHardlinesDroplistItems() {
      return $http
        .get(apiUrl + 'getHardlinesDroplistItems')
        .then(function(response) {
          return response.data;
        });
    }

    function getCenterDroplistItems() {
      return $http
        .get(apiUrl + 'getCenterDroplistItems')
        .then(function(response) {
          return response.data;
        });
    }

    function getFoodsDroplistItems() {
      return $http
        .get(apiUrl + 'getFoodsDroplistItems')
        .then(function(response) {
          return response.data;
        });
    }

    function getDepartmentDroplistItems(departmentName) {
      return $http
        .get(apiUrl + 'getDepartmentDroplistItems', departmentName)
        .then(function(response) {
          return response.data;
        });
    }

    function getRejectedDroplistItems() {
      return $http
        .get(apiUrl + 'getRejectedDroplistItems')
        .then(function(response) {
          return response.data;
        });
    }
  }
})();
