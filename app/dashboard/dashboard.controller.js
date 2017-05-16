(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$stateParams', 'authFactory', 'departmentsFactory', 'chartsFactory'];

  /* @ngInject */
  function DashboardController($stateParams, authFactory, departmentsFactory, chartsFactory) {
    var vm = this;

    vm.bigMac = {
      data: [4, 6.1, 2.8], // while literal in this example, this will really be the result of the call to the .map function.
      labels: ['2014', '2015', '2016'] // see above comment, same applys here.
    };

    activate();

    function activate() {
      vm.role = authFactory.role;
      getDepartments();
      getChartsData();
      getDroplistItems();
      getHardlinesDroplistItems();
      getCenterDroplistItems();
      getFoodsDroplistItems();
      // vm.hardlinesDroplistItems = getDepartmentDroplistItems("Hardlines");
      // vm.centerDroplistItems = getDepartmentDroplistItems("Center");
      // vm.foodsDroplistItems = getDepartmentDroplistItems("Foods");
    }

    function getDepartments() {
      departmentsFactory
        .getAll()
        .then(function(departments) {
          vm.departments = departments;
        });
    }

    function getChartsData() {
      chartsFactory
        .getTodaysDroplists()
        .then(function(todaysDroplists) {
          vm.todaysDroplists = todaysDroplists;
        });
    }

    function getDroplistItems() {
      chartsFactory
        .getDroplistItems()
        .then(function(droplistItems) {
          vm.droplistItems = droplistItems;
        });
    }

    function getHardlinesDroplistItems() {
      chartsFactory
        .getHardlinesDroplistItems()
        .then(function(departmentDroplistItems) {
          vm.hardlinesDroplistItems = departmentDroplistItems;
        });
    }

    function getCenterDroplistItems() {
      chartsFactory
        .getCenterDroplistItems()
        .then(function(departmentDroplistItems) {
          vm.centerDroplistItems = departmentDroplistItems;
        });
    }

    function getFoodsDroplistItems() {
      chartsFactory
        .getFoodsDroplistItems()
        .then(function(departmentDroplistItems) {
          vm.foodsDroplistItems = departmentDroplistItems;
        });
    }

    // function getDepartmentDroplistItems(departmentName) {
    //   chartsFactory
    //     .getDepartmentDroplistItems(departmentName)
    //     .then(function(departmentDroplistItems) {
    //       return departmentDroplistItems;
    //     });
    // }
  }
})();
