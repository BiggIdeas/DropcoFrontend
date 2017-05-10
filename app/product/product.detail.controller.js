(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('ProductDetailController', ProductDetailController);

    ProductDetailController.$inject = [];

    /* @ngInject */
    function ProductDetailController() {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
