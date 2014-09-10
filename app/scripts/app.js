'use strict';

angular
    .module('marinetApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angularMoment',
    'infinite-scroll',
    'toaster',
    'ui.gravatar',
    'services.config',
  ])
    .config(['$routeProvider', '$httpProvider', '$locationProvider',
        function ($routeProvider, $httpProvider, $locationProvider) {
            var access = routingConfig.accessLevels;

            $httpProvider.defaults.withCredentials = true;

            $httpProvider.interceptors.push(['$q', '$location', '$rootScope',
                function ($q, $location, $rootScope) {
                    return {
                        'response': function (response) {
                            $('.btn').button('reset');
                            return response || $q.when(response);
                        },

                        'responseError': function (rejection) {
                            if (rejection.status === 403) {

                                $rootScope.loggedIn = false;
                                $location.path('/login');
                            }
                            $('.btn').button('reset');
                            return $q.reject(rejection);
                        }
                    };
            }]);

            $locationProvider.hashPrefix('!');

            $routeProvider
                .when('/:account/apps', {
                    templateUrl: 'views/apps.html',
                    controller: 'AppsCtrl',
                    access: access.user
                })
                .when('/:account/newapp', {
                    templateUrl: 'views/newapp.html',
                    controller: 'NewappCtrl',
                    access: access.user
                })
                .when('/:account/:appName/errors', {
                    templateUrl: 'views/errors.html',
                    controller: 'ErrorsCtrl',
                    access: access.user
                })
                .when('/:account/:appName/errors/:hash', {
                    templateUrl: 'views/error.html',
                    controller: 'ErrorCtrl',
                    access: access.user
                })
                .when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'LoginCtrl',
                    access: access.anon
                })
                .when('/logout', {
                    controller: 'LogoutCtrl',
                    access: access.anon
                })
                .when('/:account/dashboard', {
                    templateUrl: 'views/dashboard.html',
                    controller: 'DashboardCtrl'
                })
                .otherwise({
                    redirectTo: '/login'
                });
    }])
    .run(['$rootScope', '$location', 'Auth',
        function ($rootScope, $location, Auth) {



}]);
