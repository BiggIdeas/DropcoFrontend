(function() {
  'use strict';

  angular
    .module('app', [
      'ui.select',
      'ui.router',
      'app.core',
      'ngSanitize',
      'LocalStorageModule',
      'oitozero.ngSweetAlert',
      'chart.js'
    ])
    // .value('apiUrl', 'http://localhost:50274/api/')
    .value('apiUrl', 'https://droplistapi.azurewebsites.net/api/')
    .value('inqstatsApiKey', '53033d30d2b47238')
    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

      $httpProvider.interceptors.push('authInterceptorService');
      $urlRouterProvider.otherwise('/login');

      $stateProvider
        .state('register', {
          url: '/register',
          controller: 'RegisterController as registerCtrl',
          templateUrl: 'app/register/register.html'
        })
        .state('login', {
          url: '/login',
          controller: 'LoginController as loginCtrl',
          templateUrl: '/app/login/login.html'
        })
        .state('knowTheTeam', {
          url: '/knowTheTeam',
          // controller: 'AboutUsController as aboutUsCtrl',
          templateUrl: '/app/knowTheTeam/knowTheTeam.html'
        })
        .state('about', {
          url: '/about',
          templateUrl: '/app/about/about.html'
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
        })
        .state('app.employees', {
          url: '/employees',
          abstract: true,
          template: '<div ui-view></div>'
        })
        .state('app.employees.detail', {
          url: '/detail/:id',
          controller: 'EmployeeDetailController as employeeDetailCtrl',
          templateUrl: 'app/employee/employee.detail.html'
        })
        .state('app.employees.grid', {
          url: '/grid',
          controller: 'EmployeeGridController as employeeGridCtrl',
          templateUrl: 'app/employee/employee.grid.html'
        })
        .state('app.products', {
          url: '/products',
          abstract: true,
          template: '<div ui-view></div>'
        })
        .state('app.products.detail', {
          url: '/detail/:id',
          controller: 'ProductDetailController as productDetailCtrl',
          templateUrl: 'app/product/product.detail.html'
        })
        .state('app.products.grid', {
          url: '/grid',
          controller: 'ProductGridController as productGridCtrl',
          templateUrl: 'app/product/product.grid.html'
        })
        .state('app.departments', {
          url: '/departments',
          controller: 'DepartmentGridController as departmentGridCtrl',
          templateUrl: 'app/department/department.grid.html'
        })
        .state('app.sections', {
          url: '/sections',
          controller: 'SectionController as sectionCtrl',
          templateUrl: 'app/section/section.grid.html'
        });
    })
    .run(function($state, $rootScope, authFactory) {
      $rootScope.$state = $state;
      authFactory.initialize();
    });
})();
