Ember.Handlebars.helper('format', function(value) {
    if (Ember.isNone(value)){
        return 0;
    }
    var inGroupsOfThree, formatted;

    inGroupsOfThree = /(?=(?:...)*$)/;
    formatted       = value+"";

    return formatted.split(inGroupsOfThree).filter(function(group) {
        return !Ember.isEmpty(group);
    }).join(",")
});
