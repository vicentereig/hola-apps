Watchtower.AppsIndexRoute = Ember.Route.extend({
    queryParams: {
        term: {
            refreshModel: true
        }
    },

    model: function() {
        this.get('store').cancelQuery('app');

        return this.store.find('app', this.paramsFor('apps')).then(null, this.notFound);
    },

    notFound: function(){
        return null;
    },

    setupController: function(controller, apps) {
        controller.set('content', apps);
    },

    actions: {
        loading: function() { return true; }
    }
});
