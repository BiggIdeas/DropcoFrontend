(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('ProductController', ProductController);

    ProductController.$inject = ['productsFactory'];

    /* @ngInject */
    function ProductController(productsFactory) {
        var vm = this;

        activate();

        function activate() {
          productsFactory
            .getAll()
            .then(function(products){
              vm.products = products;
            })
            .catch(function(error){
              console.error(error);
            });
        }
    }
})();
