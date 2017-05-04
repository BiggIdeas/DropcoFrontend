(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('DroplistDetailController', DroplistDetailController);

  DroplistDetailController.$inject = ['droplistsFactory', 'departmentsFactory', 'sectionsFactory', '$stateParams'];

  /* @ngInject */
  function DroplistDetailController(droplistsFactory, departmentsFactory, sectionsFactory, $stateParams) {
    var vm = this;
    vm.save = save;
    vm.title = "New Droplist";
    vm.departmentSections = [];
    vm.isNew = true;

    activate();

    function activate() {
      var droplistId = $stateParams.id;

      if (droplistId) {
        console.log("isnotnew");
        vm.isNew = false;
        droplistsFactory
          .getById(droplistId)
          .then(function(droplist) {
            console.log(droplist);
            vm.droplist = droplist;
            vm.title = vm.droplist.droplistName;
          })
          .catch(function(error) {
            console.error(error);
          });
      } else {
        console.log("isnew");
        vm.droplist = {
          droplistName: "",
          createdOnDate: new Date(),
          stockerId: 1, //take logged in stocker id
          droplistItems: []
        };
      }



      departmentsFactory
        .getAll()
        .then(function(departments) {
          vm.departments = departments;
        })
        .catch(function(error) {
          console.error(error);
        });

      sectionsFactory
        .getAll()
        .then(function(sections) {
          vm.sections = sections;
        })
        .catch(function(error) {
          console.error(error);
        });
    }

    vm.addItem = function addItem() {
      vm.droplist.droplistItems.push({});
    }

    vm.remove = function remove(droplistItem) {
      vm.droplist.droplistItems.splice(vm.droplist.droplistItems.indexOf(droplistItem), 1);
    }

    function save() {
      droplistsFactory
        .create(vm.droplist)
        .then(function() {
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

    vm.filterSections = function filterSections() {
      vm.departmentSections = [];
      for (var i = 0; i < vm.sections.length; i++) {
        if (vm.sections[i].departmentId == vm.selectedDepartment.departmentId)
          vm.departmentSections.push(vm.sections[i]);
      }
    }
  }
})();
