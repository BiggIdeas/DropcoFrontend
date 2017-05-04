(function() {
  'use strict';

  angular
    .module('app', [
      'ui.router',
      'app.core',
      'LocalStorageModule'
    ])
    .value('apiUrl', 'http://localhost:50274/api/')
    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

      $httpProvider.interceptors.push('authInterceptorService');
      $urlRouterProvider.otherwise('/login');

      $stateProvider
        .state('register', {
          url: '/register',
          controller: 'RegisterController as register',
          templateUrl: 'app/register/register.html'
        })
        .state('login', {
          url: '/login',
          controller: 'LoginController as login',
          templateUrl: '/app/login/login.html'
        })
        .state('app', {
          url: '/app',
          abstract: true,
          template: '<div ui-view></div>'
        })
        .state('app.dashboard', {
          url: '/dashboard',
          controller: 'DashboardController as dashboardCtrl',
          templateUrl: 'app/dashboard/dashboard.html'
        })
        .state('app.droplist', {
          url: '/droplist',
          abstract: true,
          template: '<div ui-view></div>'
        })
        .state('app.droplist.detail', {
          url: '/detail/:id',
          controller: 'DroplistDetailController as droplistDetailCtrl',
          templateUrl: 'app/droplist/droplist.detail.html'
        })
        .state('app.droplist.grid', {
          url: '/grid',
          controller: 'DroplistGridController as droplistGridCtrl',
          templateUrl: 'app/droplist/droplist.grid.html'
        });
    });
})();
