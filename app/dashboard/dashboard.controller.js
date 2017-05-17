(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$stateParams', 'authFactory', 'departmentsFactory', 'chartsFactory'];

  /* @ngInject */
  function DashboardController($stateParams, authFactory, departmentsFactory, chartsFactory) {
    var vm = this;

    activate();

    function activate() {
      vm.role = authFactory.role;
      getDepartments();
      getChartsData();
      getDroplistItems();
      getHardlinesDroplistItems();
      getCenterDroplistItems();
      getFoodsDroplistItems();

      if (vm.role == "Stocker")
      {
        // getRejectedDroplistItems();
        chartsFactory
          .getRejectedDroplistItems()
          .then(function(rejectedDroplistItems) {
            vm.rejectedDroplistItems = rejectedDroplistItems;
          });
      }
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
