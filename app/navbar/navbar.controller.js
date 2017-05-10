(function() {
    'use strict';

    angular
        .module('app')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['authFactory', '$rootScope'];

    /* @ngInject */
    function NavbarController(authFactory, $rootScope) {
        var vm = this;

        activate();

        function activate() {
            vm.username = authFactory.username;
            vm.role = authFactory.role;
            vm.userId = authFactory.userId;
            $rootScope.$on('login-happened', function(e, data) {
              vm.username = data.username;
              vm.role = data.role;
              vm.userId = data.userId;

            });
        }
    }
})();
