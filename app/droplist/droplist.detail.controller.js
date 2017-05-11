(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('DroplistDetailController', DroplistDetailController);

  DroplistDetailController.$inject = ['productsFactory', 'droplistsFactory', 'departmentsFactory', 'sectionsFactory', '$stateParams', 'authFactory', '$state'];

  /* @ngInject */
  function DroplistDetailController(productsFactory, droplistsFactory, departmentsFactory, sectionsFactory, $stateParams, authFactory, $state) {
    var vm = this;

    vm.addItem = addItem;
    vm.save = save;
    vm.editList = editList;
    vm.remove = remove;
    vm.filterSections = filterSections;

    activate();

    function activate() {
      vm.role = authFactory.role;
      var droplistId = $stateParams.id;
      getEmployeeRole();
      getDepartments();
      getSections();
      getProducts();

      if (droplistId > 0) {
        vm.isNew = false;
        droplistsFactory
          .getById(droplistId)
          .then(function(droplist) {
            vm.droplist = droplist;
            vm.title = vm.droplist.droplistName;
          })
          .catch(function(error) {
            console.error(error);
          });
      } else {
        vm.isNew = true;
        vm.title = "New Droplist";
        vm.droplist = {
          droplistName: "",
          createdOnDate: new Date(),
          stockerId: 1, //take logged in stocker id
          droplistItems: []
        };
      }
    }

    function getEmployeeRole() {
      if (vm.role === "Driver") {
        vm.isDriver = true;
      } else {
        vm.isDriver = false;
      }
    }

    function getDepartments() {
      departmentsFactory
        .getAll()
        .then(function(departments) {
          vm.departments = departments;
        })
        .catch(function(error) {
          console.error(error);
        });
    }

    function getSections() {
      sectionsFactory
        .getAll()
        .then(function(sections) {
          vm.sections = sections;
        })
        .catch(function(error) {
          console.error(error);
        });
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

    function addItem() {
      vm.droplist.droplistItems.push({});
    }

    function editList() {
      vm.editable = true;
    }

    function remove(droplistItem) {
      vm.droplist.droplistItems.splice(vm.droplist.droplistItems.indexOf(droplistItem), 1);
    }

    function save() {
      vm.droplist.stockerId = authFactory.userId;
      vm.droplist.buildingId = authFactory.buildingId;

      if ($stateParams.id > 0) {
        droplistsFactory
          .update($stateParams.id, vm.droplist)
          .then(function() {
            // tell user good things happened
          });
      } else {
        droplistsFactory
          .create(vm.droplist)
          .then(function(response) {
            $state.go('app.droplist.detail', {
              id: response.droplistId
            });
            // var droplistId = $stateParams.id;
            //
            // if (droplistId) {
            //   droplistsFactory
            //     .update(vm.droplist.droplistId, vm.droplist)
            //     .then(function() {
            // SweetAlert.swal("Droplist saved!", "You did it!", "success");
            //     })
            // } else {
            //   console.log("print something")
            //   droplistsFactory
            //     .create(vm.droplist)
            //     .then(function() {
            // SweetAlert.swal("Droplist saved!", "Great Job!", "success");
            //     });
            // }
          });
      }
    }

    function filterSections() {
      vm.departmentSections = [];
      for (var i = 0; i < vm.sections.length; i++) {
        if (vm.sections[i].departmentId == vm.droplist.departmentName.departmentId)
          vm.departmentSections.push(vm.sections[i]);
      }
    }
  }
})();
