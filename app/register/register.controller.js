// (function() {
//     'use strict';
//     angular
//         .module('app.core')
//         .controller('RegisterController', RegisterController);
//     RegisterController.$inject = ['authFactory', '$state'];
//     /* @ngInject */
//     function RegisterController(authFactory, $state) {
//         var vm = this;
//
//         vm.registration = {
//             username: '',
//             password: '',
//             confirmPassword: ''
//         };
//         vm.register = register;
//         ////////////////
//         function register() {
//             authFactory.register(vm.registration).then(
//                 function(response) {
//                     alert('Registration successful! Please login.');
//                     $state.go('login');
//                 },
//                 function(response) {
//                     alert('Registration form invalid');
//                 }
//             );
//         }
//     }
// })();

(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['authFactory', '$stateParams', '$state', 'rolesFactory'];

    /* @ngInject */
    function RegisterController(authFactory, $stateParams, $state, rolesFactory) {
        var vm = this;

        vm.title = 'RegisterController';
        activate();
        function activate() {
            rolesFactory
                .getAll()
                .then(function(roles) {

                    vm.roles = roles;
                }) .catch(function(error){
                  console.error(error);


                });



        }
        vm.registration = {
            firstName: '',
            lastName: '',
            cellphone: '',
            address: '',
            username: '',
            emailAddress: '',
            password: '',
            confirmPassowrd: ''
        };

        vm.registerDets = registerDets;
        vm.registerCust = registerCust;

        function registerDets() {
            vm.registration.address = vm.registration.address.formatted_address;
            authFactory
                .registerDetailer(vm.registration)
                .then(function(response) {
                    alert('Successful registration! Now login');
                    authFactory
                        .login(vm.registration.username, vm.registration.password)
                        .then(function() {
                            $state.go('login');
                        });
                })
                .catch(function(error) {
                    alert('Bad registration');
                });

        }

        function registerCust() {
            vm.registration.address = vm.registration.address.formatted_address;
            authFactory
                .registerCustomer(vm.registration)
                .then(function(response) {
                    alert('Successful registration! Now login');
                    authFactory
                        .login(vm.registration.username, vm.registration.password)
                        .then(function() {
                            $state.go('login');
                        });
                })
                .catch(function(error) {
                    alert('Bad registration');
                });
        }
    }
})();
