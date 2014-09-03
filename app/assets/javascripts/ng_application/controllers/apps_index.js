// 2. we listen to $scope.term changes to trigger a search
function AppsIndexController($scope, $state, apps) {
    $scope.apps = apps;
    this.searchTermDidChange = function(newValue, oldValue){
        if (oldValue == newValue) {
            return;
        }
        $state.goto('application.index', {term: newValue});
    };

    $scope.$watch('term', this.searchTermDidChange);
}

Watchtower.controller('AppsIndexController', ['$scope', '$state', 'apps', AppsIndexController]);
