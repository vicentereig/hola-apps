var Watchtower = angular.module('watchtower', ['dotjem.routing', 'templates']);

Watchtower.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('application', {
        route: '/',
        views: {
            application: {
                template: 'ng_application/templates/application.html'
            }
        }
    });

    $stateProvider.state('application.results', {
        route: '/apps',
        views: {
            results: {
                controller: 'AppsController',
                template: 'ng_application/templates/apps/results.html'
            }
        },
        resolve: {
            apps: ['$to', function($to){
                // return store.find('apps', {term: $to.$params.term});
               console.log($to.$params);
               return [];
            }]
        }
    });
}]);

function AppsController($scope, $state) {

    $scope.$watch('term', function(newValue, oldValue){
        if (oldValue == newValue) {
            $scope.term = $state.current.$params.term;
            return;
        }
        $state.goto('application.results', {term: newValue});
    })
}

Watchtower.directive('focus', function () {
    return function (scope, element, attrs) {
        attrs.$observe('focus', function (newValue) {
            newValue === 'true' && element[0].focus();
        });
    }
});

Watchtower.controller('AppsController', ['$scope', '$state', AppsController]);
