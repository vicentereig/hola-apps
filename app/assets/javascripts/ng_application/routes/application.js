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
}]);
