'use strict';

angular.module('marinetApp')
    .factory('Errors', ['$resource', 'configuration',
        function ($resource, configuration) {
            var d = new Date();
            console.log('criado');
            var errors = $resource(configuration.url + '/:appName/error/:hash', {
                cacheSlayer: d.getTime()
            }, {
                'find': {
                    url: configuration.url + '/:appName/errors'
                },
                'findOne': {
                    url: configuration.url + '/error/:hash/:id'
                },
                'solve': {
                    method: 'PUT',
                    params: {
                        hash: '@hash'
                    }
                }
            });
            return {
                query: function (filter, success, error) {
                    return errors.find({
                            appName: filter.appName,
                            page: filter.page,
                            q: filter.query,
                            solved: filter.solved,
                            sort: filter.sort,
                            cacheSlayer: d.getTime()
                        },
                        success,
                        error);
                },
                get: function (hash, appName, success) {
                    return errors.get({
                        hash: hash,
                        appName: appName
                    }, success);
                },
                getById: function (hash, id, success, error) {
                    return errors.findOne({
                            hash: hash,
                            id: id
                        },
                        success,
                        error);
                },
                solve: function (hash, appName) {
                    return errors.solve({
                        hash: hash,
                        appName: appName
                    }).$promise;
                },
            };
    }]);
