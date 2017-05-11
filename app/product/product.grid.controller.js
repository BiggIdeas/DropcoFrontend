(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('ProductGridController', ProductGridController);

  ProductGridController.$inject = ['productsFactory'];

  /* @ngInject */
  function ProductGridController(productsFactory) {
    var vm = this;
    vm.addingNewProduct = false;

    activate();

    function activate() {
      getProducts();
    }

    function getProducts() {
      productsFactory
        .getAll()
        .then(function(products) {
          vm.products = products;
        })
        .catch(function(error) {
          console.error(error);
        });
    }

    vm.searchProduct = function searchProduct() {
      console.log("hi");
    }

    vm.addNewProduct = function addNewProduct() {
      vm.addingNewProduct = true;
    }

    vm.saveNewProduct = function saveNewProduct() {
      productsFactory
        .create(vm.newProduct)
        .then(function(newProduct) {
          getProducts();
          vm.addingNewProduct = false;
          clearControls();
        })
        .catch(function(error) {
          console.error(error);
        });
    }

    vm.cancelSaveNewProduct = function cancelSaveNewProduct() {
      vm.addingNewProduct = false;
      clearControls();
    }

    function clearControls() {
      vm.newProduct.itemNumber = '';
      vm.newProduct.description = '';
      vm.newProduct.print = '';
    }

    function remove(product) {
      productsFactory
        .remove(product.id)
        .then(function() {
          vm.products.splice(vm.products.indexOf(product), 1);
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  }
})();
