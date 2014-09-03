var Watchtower = angular.module('watchtower', ['dotjem.routing', 'templates']);

Watchtower.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('application', {
        route: '/',
        views: {
            application: {
                controller: 'ApplicationController',
                template: 'ng_application/templates/application.html'
            }
        }
    });

    $stateProvider.state('application.index', {
        route: '/apps',
        views: {
            index: {
                controller: 'AppIndexController',
                template: 'ng_application/templates/apps/index.html'
            }
        },
        resolve: {
            // 3. we trigger a search every time we transition to this state
            apps: ['$to', 'DataStore', function($to, store){
                if (!$to.$params.term) {
                    return [];
                }
                store.cancelAll('software');
                return store.findAll('software', {term: $to.$params.term});
            }]
        }
    });
}]);

function DataStore($http, $q, $log) {
    var cancelers = {};

    this.cancelAll = function(resourceType) {
        if (!angular.isUndefined(cancelers[resourceType])){
            var cancelables = cancelers[resourceType].splice(0,cancelers[resourceType].length-1);
            $log.debug('not cancelled: ', cancelers[resourceType].length);
            var i = 0;
            angular.forEach(cancelables, function(canceler){
                $log.debug('cancelling', resourceType, i++);
                canceler.resolve();
            });
        }
    }

    this.findAll = function(resourceType, params){
        var canceler;
        canceler = $q.defer();

        if (angular.isUndefined(cancelers[resourceType])){
            cancelers[resourceType] = [];
        }

        cancelers[resourceType].push(canceler);

        return $http.get(resourceUrl(resourceType), {params: params, timeout: canceler.promise})
                    .then(adaptResponse, $log.error);
    }

    function adaptResponse(response) {
        return response.data.app;
    }

    function resourceUrl(resourceType) {
       return ['/api', resourceType].join('/');
    }
}

Watchtower.service('DataStore', ['$http', '$q', '$log', DataStore]);

// 2. we listen to $scope.term changes to trigger a search
function AppIndexController($scope, $state, apps) {
    $scope.apps = apps;
    this.searchTermDidChange = function(newValue, oldValue){
        if (oldValue == newValue) {
            return;
        }
        $state.goto('application.index', {term: newValue});
    };

    $scope.$watch('term', this.searchTermDidChange);
}

Watchtower.directive('focus', function () {
    return function (scope, element, attrs) {
        attrs.$observe('focus', function (newValue) {
            newValue === 'true' && element[0].focus();
        });
    }
});

Watchtower.controller('AppIndexController', ['$scope', '$state', 'apps', AppIndexController]);

// 1. $state sets the contents of the search box (if there's something to set fromt he query params)
function ApplicationController($scope, $state) {
    $scope.term = $state.params.term;
}

Watchtower.controller('ApplicationController', ['$scope', '$state', ApplicationController]);
