Watchtower.AppsIndexRoute = Ember.Route.extend({
    queryParams: {
        term: {
            refreshModel: true
        }
    },

    model: function() {
        var params = this.paramsFor('apps');

        this.get('store').cancelQuery('app');

        if (Ember.isNone(params.term)){
            return [];
        }

        return this.store.find('app', params).then(null, this.notFound);
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
