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
                store.cancelAll('software', {term: $to.$params.term});

                if (!$to.$params.term) {
                    return [];
                }

                return store.findAll('software', {term: $to.$params.term});
            }]
        }
    });
}]);

function RequestQueue($log, $timeout) {
    var queues = [];

    function CancelableRequest(resourceType, params, deferred) {
        var canceler = deferred;

        this.promise      = canceler.promise.then(logCancellation, $log.error);
        this.resourceType = resourceType;
        this.params       = params;

        this.cancel = function() {
            $log.debug('Cancelling', this.resourceType, this.params);
            return canceler.resolve({type: this.resourceType, params: this.params});
        }

        function logCancellation(request) {
            $log.debug('Response cancelled: ', request.type, request.params);
        }
    }

    this.add = function(request){
        var cancelable = new CancelableRequest(request.resourceType, request.params, request.deferred);
        $timeout(function(){
            queueFor(request.resourceType).push(cancelable);
            $log.debug('Cancelable queue for', request.resourceType, ':', queueFor(request.resourceType).length);
        });

        return cancelable.promise;
    }

    this.cancelAllPreviousRequests = function(resourceType) {
        angular.forEach(allPreviousRequestsFor(resourceType), function(request){
            request.cancel();
        });
    }

    function queueFor(resourceType) {
        if (angular.isUndefined(queues[resourceType])){
            queues[resourceType] = [];
        }
        return queues[resourceType];
    }

    function allPreviousRequestsFor(resourceType) {
        var resourceQueue = queueFor(resourceType);
        $log.debug('Previous Requests for ', resourceType,':', resourceQueue.length);
        return resourceQueue.splice(0, resourceQueue.length );
    }
}

Watchtower.service('requestQueue', ['$log', '$timeout', RequestQueue]);

function DataStore($http, $log, $q, requestQueue) {
    this.cancelAll = function(resourceType) {
        requestQueue.cancelAllPreviousRequests(resourceType);
    }

    this.findAll = function(resourceType, params){
        var canceler = requestQueue.add({resourceType: resourceType, params: params, deferred: $q.defer()});

        return $http.get(resourceUrl(resourceType), {params: params, timeout: canceler})
                    .then(adaptResponse, $log.error);
    }

    function adaptResponse(response) {
        var rootName = Object.keys(response.data)[0];
        return response.data[rootName];
    }

    function resourceUrl(resourceType) {
       return ['/api', resourceType].join('/');
    }
}

Watchtower.service('DataStore', ['$http', '$log', '$q', 'requestQueue', DataStore]);

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
