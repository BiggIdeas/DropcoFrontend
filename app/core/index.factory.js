(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('indexFactory', indexFactory);

    indexFactory.$inject = [];

    /* @ngInject */
    function indexFactory() {
        var service = {
            getAll: getAll
        };

        return service;

        function getAll() {

        }
    }
})();
