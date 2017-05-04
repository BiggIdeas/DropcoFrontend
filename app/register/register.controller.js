(function() {
    'use strict';
    angular
        .module('app.core')
        .controller('RegisterController', RegisterController);
    RegisterController.$inject = ['authFactory', '$state'];
    /* @ngInject */
    function RegisterController(authFactory, $state) {
        var vm = this;

        vm.registration = {
            username: '',
            password: '',
            confirmPassword: ''
        };
        vm.register = register;
        ////////////////
        function register() {
            authFactory.register(vm.registration).then(
                function(response) {
                    alert('Registration successful! Please login.');
                    $state.go('login');
                },
                function(response) {
                    alert('Registration form invalid');
                }
            );
        }
    }
})();
