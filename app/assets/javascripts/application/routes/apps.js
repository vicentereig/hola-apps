Watchtower.AppsRoute = Em.Route.extend({
    queryParams: {
        term: {
            refreshModel: true
        }
    },
    beforeModel: function() {
        this.controllerFor('apps').set('term', this.paramsFor('apps').term);
        this.transitionTo('apps.search', {queryParams: this.paramsFor('apps')});
    }

});

