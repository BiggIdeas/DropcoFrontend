(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('DroplistDetailController', DroplistDetailController);

    DroplistDetailController.$inject = ['productsFactory', 'droplistsFactory', 'departmentsFactory', 'sectionsFactory', '$stateParams', 'authFactory', '$state'];

    /* @ngInject */
    function DroplistDetailController(productsFactory, droplistsFactory, departmentsFactory, sectionsFactory, $stateParams, authFactory, $state) {
        var vm = this;
        vm.save = save;
        vm.title = "New Droplist";
        vm.departmentSections = [];
        vm.isNew = true;

        activate();



        function activate() {
            vm.role = authFactory.role;
            if (vm.role === "Driver") {
                vm.isDriver = true;
            } else {
                vm.isDriver = false;
            }
            var droplistId = $stateParams.id;


            if (droplistId > 0) {
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

            productsFactory
                .getAll()
                .then(function(products) {
                    vm.products = products;
                })
                .catch(function(error) {
                    console.error(error);
                });

        }

        vm.addItem = function addItem() {
            vm.droplist.droplistItems.push({});
        }
        vm.editList = function editList() {
            vm.editable = true;
        }

        vm.remove = function remove(droplistItem) {
            vm.droplist.droplistItems.splice(vm.droplist.droplistItems.indexOf(droplistItem), 1);
        }

        function save() {
            console.log(vm.droplist);
            /* THIS NEEDS TO BE REPLACED WHEN AUTH WORKS */
            vm.droplist.stockerId = 1;
            vm.droplist.driverId = 2;
            vm.droplist.buildingId = 1;
            /* YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS */

            //   vm.droplist.sectionId = vm.droplist.selectedSection.sectionId;

            if ($stateParams.id > 0) {
                droplistsFactory
                    .update($stateParams.id, vm.droplist)
                    .then(function() {
                        // tell user good things happened
                    });
            } else {
                vm.droplist.stockerId = 1;
                droplistsFactory
                    .create(vm.droplist)
                    .then(function(response) {
                        console.log(response);
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

        vm.filterSections = function filterSections() {
            vm.departmentSections = [];
            for (var i = 0; i < vm.sections.length; i++) {
                if (vm.sections[i].departmentId == vm.droplist.departmentName.departmentId)
                    vm.departmentSections.push(vm.sections[i]);
            }
        }
    }
})();
