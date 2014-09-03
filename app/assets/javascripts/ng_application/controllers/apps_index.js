// 2. we listen to $scope.term changes to trigger a search
function AppsIndexController($scope, apps) {
    $scope.apps = apps;
}

Watchtower.controller('AppsIndexController', ['$scope', 'apps', AppsIndexController]);
