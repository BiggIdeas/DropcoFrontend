(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$stateParams'];

    /* @ngInject */
    function DashboardController($stateParams) {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
