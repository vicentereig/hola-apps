Watchtower.AppsRoute = Em.Route.extend({
    queryParams: {
        term: {
            refreshModel: true
        }
    },

    setupController: function(controller, model) {
        controller.set('term', this.paramsFor('apps').term);
    }

});

