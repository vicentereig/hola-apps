Watchtower.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('application', {
        route: '/',
        onEnter: ['$state', function($state){
            $state.goto('application.index');
        }],
        views: {
            application: {
                controller: 'ApplicationController',
                template: 'ng_application/templates/application.html'
            }
        }
    });
}]);
