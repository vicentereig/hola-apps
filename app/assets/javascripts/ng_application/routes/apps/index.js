Watchtower.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('application.index', {
        route: '/apps',
        views: {
            index: {
                controller: 'AppsIndexController',
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
