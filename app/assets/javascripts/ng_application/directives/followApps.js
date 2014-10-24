function FollowAppsDirective() {
    this.restrict = 'E';
    this.templateUrl = 'ng_application/templates/components/follow_apps.html';
    this.scope = { apps: '=' };
    this.controller = 'FollowAppsController';

    return this;
}

HolaApps.directive('followApps', FollowAppsDirective);

function FollowAppsController($scope) {

    this.toggleFollowAppsComponent = function() {
        $scope.showFollowAppsComponent = $scope.apps && $scope.apps.length > 0;
    }
    $scope.$watchCollection('apps', this.toggleFollowAppsComponent);

}

HolaApps.controller('FollowAppsController', ['$scope', FollowAppsController]);


