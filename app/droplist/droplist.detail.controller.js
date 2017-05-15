(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('DroplistDetailController', DroplistDetailController);

  DroplistDetailController.$inject = ['productsFactory', 'droplistsFactory', 'departmentsFactory', 'sectionsFactory', 'droplistItemFactory', 'authFactory', '$stateParams', '$state', 'SweetAlert'];

  /* @ngInject */
  function DroplistDetailController(productsFactory, droplistsFactory, departmentsFactory, sectionsFactory, droplistItemFactory, authFactory, $stateParams, $state, SweetAlert) {
    var vm = this;

    vm.addItem = addItem;
    vm.save = save;
    vm.editList = editList;
    vm.remove = remove;
    vm.filterSections = filterSections;
    vm.markDroplistItemCompleted = markDroplistItemCompleted;
    vm.markDroplistItemRejected = markDroplistItemRejected;

    activate();

    function activate() {
      vm.role = authFactory.role;
      var droplistId = $stateParams.id;
      getEmployeeRole();
      getDepartments();
      getSections();
      getProducts();
      getRows();

      if (droplistId > 0) {
        vm.isNew = false;
        droplistsFactory
          .getById(droplistId)
          .then(function(droplist) {
            vm.droplist = droplist;
            vm.title = vm.droplist.droplistName;
            console.log(vm.droplist);
          })
          .catch(function(error) {
            console.error(error);
          });
      } else {

        var offset = -7;
        var date = new Date(new Date().getTime() + offset * 3600 * 1000).toUTCString();
        vm.isNew = true;
        vm.title = "New Droplist";
        vm.droplist = {
          droplistName: "",
          createdOnDate: date,
          stockerId: authFactory.userId,
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

    function getRows() {
      vm.rows= ["A", "B", "C", "D"];
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

    function markDroplistItemCompleted(droplistItem) {
      droplistItem.completed = new Date();
      updateDroplistItem(droplistItem);
    }

    function markDroplistItemRejected(droplistItem) {
      droplistItem.rejected = new Date();
      updateDroplistItem(droplistItem);
    }

    function updateDroplistItem(droplistItem) {
      // if (vm.droplist.driverId == null) {
      //   vm.droplist.driverId = authFactory.userId;
      // }
      // droplistsFactory
      //   .update(vm.droplist.droplistId, vm.droplist);

      droplistItemFactory
        .update(droplistItem.droplistItemId, droplistItem)
        .then(function(droplistItem) {
        })
        .catch(function(error) {
          console.error(error);
        });
    }

    function save() {
      vm.droplist.stockerId = authFactory.userId;
      vm.droplist.buildingId = authFactory.buildingId;

      if ($stateParams.id > 0) {
        droplistsFactory
          .update($stateParams.id, vm.droplist)
          .then(function() {
            SweetAlert.swal("Droplist saved!", "Name: " + vm.droplist.droplistName, "success");
            vm.editable = false;
          });
      } else {
        droplistsFactory
          .create(vm.droplist)
          .then(function(response) {
            SweetAlert.swal("Droplist created!", "Name: " + vm.droplist.droplistName, "success");
            $state.go('app.droplist.detail', {
              id: response.droplistId
            });
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
