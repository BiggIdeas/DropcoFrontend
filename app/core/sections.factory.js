(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('sectionsFactory', sectionsFactory);

    sectionsFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function sectionsFactory($http, apiUrl) {
        var service = {
            getAll: getAll
        };

        return service;

        function getAll() {
            return $http
                .get(apiUrl + 'Sections')
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();
