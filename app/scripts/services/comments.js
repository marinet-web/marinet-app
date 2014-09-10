'use strict';

/**
 * @ngdoc service
 * @name marinetApp.Comments
 * @description
 * # Comments
 * Factory in the marinetApp.
 */
angular.module('marinetApp')
    .factory('Comments', ['$resource', 'configuration',
        function ($resource, configuration) {
            var d = new Date();
            var comments = $resource(configuration.url + '/comments/:hash', {
                cacheSlayer: d.getTime()
            }, {
                'comment': {
                    method: 'POST',
                    url: configuration.url + '/comment'
                }
            });
            return {
                query: function (hash) {
                    return comments.query({
                        hash: hash
                    });
                },
                comment: function (data) {
                    return comments.comment(data).$promise;
                }
            };
    }]);
