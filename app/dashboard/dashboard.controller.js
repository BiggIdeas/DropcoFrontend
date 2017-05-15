(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$stateParams', 'authFactory', 'departmentsFactory'];

  /* @ngInject */
  function DashboardController($stateParams, authFactory, departmentsFactory) {
    var vm = this;

    vm.bigMac = {
      data: [4.4, 4.1, 3.8], // while literal in this example, this will really be the result of the call to the .map function.
      labels: ['2014', '2015', '2016'] // see above comment, same applys here.
    };

    vm.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    vm.series = ['Series A', 'Series B'];
    vm.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];

    activate();

    function activate() {
      vm.role = authFactory.role;
      getDepartments();
    }

    function getDepartments() {
      departmentsFactory
        .getAll()
        .then(function(departments) {
          vm.departments = departments;
          console.log(vm.departments);
        });
    }
  }
})();
