(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('productsFactory', productsFactory);

    productsFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function productsFactory($http, apiUrl) {
        var service = {
            getAll: getAll
        };

        return service;

        function getAll() {
            return $http
                .get(apiUrl + 'Products')
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();
