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
            results: {
                controller: 'AppIndexController',
                template: 'ng_application/templates/apps/index.html'
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

function AppIndexController($scope, $state) {
    this.searchTermDidChange = function(newValue, oldValue){
        console.log(newValue, oldValue);
        if (oldValue == newValue) {
            return;
        }
//        $location.search({term: newValue});
//        $state.reload('application.index', true);
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

Watchtower.controller('AppIndexController', ['$scope', '$state', '$location', AppIndexController]);

function ApplicationController($scope, $state) {
    $scope.term = $state.params.term;
}

Watchtower.controller('ApplicationController', ['$scope', '$state', ApplicationController]);
