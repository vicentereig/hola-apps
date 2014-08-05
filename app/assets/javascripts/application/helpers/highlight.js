Ember.Handlebars.helper('highlight', function(value, options) {
    var escaped = Handlebars.Utils.escapeExpression(value);
    return new Ember.Handlebars.SafeString('<span class="highlight">' + escaped + '</span>');
});
