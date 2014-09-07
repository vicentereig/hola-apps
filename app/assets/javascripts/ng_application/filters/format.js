Watchtower.filter('format', function() {
    return function(value) {
        if (angular.isUndefined(value)){
            return 0;
        }
        var inGroupsOfThree, formatted;

        inGroupsOfThree = /(?=(?:...)*$)/;
        formatted       = value+"";

        return formatted.split(inGroupsOfThree).filter(function(group) {
            return group.length > 0;
        }).join(",")
    }
});

