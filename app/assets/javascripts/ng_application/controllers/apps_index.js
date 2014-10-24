// 2. we listen to $scope.term changes to trigger a search
function AppsIndexController($scope, apps) {
    $scope.apps = apps;
    $scope.showResults = apps.length > 0;

    this.aggregateSelectedApps = function(apps) {
        $scope.selectedApps = apps.filter(function(app) {
            return app.isSelected;
        });
    }

    $scope.$watch('apps', this.aggregateSelectedApps, true);
}

HolaApps.controller('AppsIndexController', ['$scope', 'apps', AppsIndexController]);
