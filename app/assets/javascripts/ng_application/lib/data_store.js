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

HolaApps.service('DataStore', ['$http', '$log', '$q', 'requestQueue', DataStore]);

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

HolaApps.service('requestQueue', ['$log', '$timeout', RequestQueue]);
