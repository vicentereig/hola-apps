HolaApps.filter('truncate', function() {
    return function(string, maxLength) {
        if(!maxLength) {
            maxLength = 40;
        }

        if (string.length < maxLength) {
            return string;
        }

        return [string.slice(0, maxLength-1),'…'].join('');
    }
});
