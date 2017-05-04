(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'authFactory'];

    /* @ngInject */
    function LoginController($state, authFactory) {
        var vm = this;
        vm.login = login;
        
        function login() {
            authFactory.login(vm.employeeNumber, vm.password).then(
                function(response) {
                    $state.go('app.dashboard');
                },
                function(error) {
                    alert(error.error_description);
                }
            );
        }
    }
})();
