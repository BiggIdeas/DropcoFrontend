(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$stateParams', 'authFactory'];

  /* @ngInject */
  function DashboardController($stateParams, authFactory) {
    var vm = this;

    vm.bigMac = {
      data: [4.4, 4.1, 3.8], // while literal in this example, this will really be the result of the call to the .map function.
      labels: ['2014', '2015', '2016'] // see above comment, same applys here.
    };

    activate();

    function activate() {
      vm.role = authFactory.role;
    }
  }
})();
