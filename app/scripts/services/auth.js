'use strict';

angular.module('marinetApp')
    .service('Auth', ['$http', '$rootScope', '$cookieStore', '$q', 'configuration',
        function ($http, $rootScope, $cookieStore, $q, configuration) {

            var accessLevels = routingConfig.accessLevels,
                userRoles = routingConfig.userRoles;

            $rootScope.loggedIn = false;
            $rootScope.user = {};

            $rootScope.accessLevels = accessLevels;
            $rootScope.userRoles = userRoles;

            return {
                authorize: function (accessLevel, role) {
                    if (role === undefined)
                        role = $rootScope.user.role;
                    return accessLevel & role;
                },

                isLoggedIn: function (user) {
                    return $rootScope.user.role === userRoles.user || $rootScope.user.role === userRoles.admin;
                },

                register: function (user, success, error) {
                    $http.post(configuration.url + '/register', user).success(success).error(error);
                },

                login: function (user, success, error) {
                    $http.post(configuration.url + '/login', user).success(function (data) {
                        $rootScope.user = data;
                        $rootScope.loggedIn = true;
                        success(data);
                    })
                        .error(error);
                },

                logout: function (success, error) {
                    $http.delete(configuration.url + '/logout').success(function () {
                        $rootScope.user = {
                            username: '',
                            role: userRoles.public
                        };
                        $rootScope.loggedIn = false;
                        success();
                    }).error(error);
                },

                fillData: function () {

                    $http.get(configuration.url + '/user')
                        .success(function (data) {
                            $rootScope.loggedIn = true;
                            $rootScope.user = data;
                        })
                        .error(function (err) {
                            console.log(err);
                            $rootScope.loggedIn = false;
                            $rootScope.user = {
                                username: '',
                                role: userRoles.public
                            };
                        });

                },

                accessLevels: accessLevels,
                userRoles: userRoles,
                user: $rootScope.user
            };
}]);
