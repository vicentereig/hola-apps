Ember.Handlebars.helper('format', function(value) {
    var inGroupsOfThree, formatted;

    inGroupsOfThree = /(?=(?:...)*$)/;
    formatted       = value+"";

    return formatted.split(inGroupsOfThree).filter(function(group) {
        return !Ember.isEmpty(group);
    }).join(",")
});
