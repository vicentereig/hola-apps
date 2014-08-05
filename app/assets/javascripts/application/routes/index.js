Watchtower.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('apps');
    }
});
