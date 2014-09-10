'use strict';

angular.module('marinetApp')
    .factory('Apps', ['$resource', 'configuration',
        function ($resource, configuration) {
            var d = new Date();
            var apps = $resource(configuration.url + '/account/apps', {
                cacheSlayer: d.getTime()
            }, {
                purge: {
                    method: 'DELETE',
                    url: configuration.url + '/account/:appName/Purge'
                },
                save: {
                    method: 'POST',
                    url: configuration.url + '/account/app'
                }
            });
            return {
                find: function () {
                    return apps.query();
                },
                save: function (obj) {
                    return apps.save(obj).$promise;
                },
                purge: function (appName) {
                    return apps.purge({
                        appName: appName
                    }).$promise;
                }
            };
    }]);
