// 1. $state sets the contents of the search box (if there's something to set fromt he query params)
function ApplicationController($scope, $state) {
    $scope.term = $state.params.term;
}

Watchtower.controller('ApplicationController', ['$scope', '$state', ApplicationController]);
