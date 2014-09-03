// 1. $state sets the contents of the search box (if there's something to set fromt he query params)
function ApplicationController($scope, $state) {
    $scope.term = $state.params.term;

    this.searchTermDidChange = function(newValue, oldValue){
        if (oldValue == newValue) {
            return;
        }
        $state.goto('application.index', {term: newValue});
    };

    $scope.$watch('term', this.searchTermDidChange);
}

Watchtower.controller('ApplicationController', ['$scope', '$state', ApplicationController]);
