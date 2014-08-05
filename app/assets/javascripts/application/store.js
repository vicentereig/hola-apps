DS.RESTAdapter.reopen({
    namespace: 'api'
});

Watchtower.ApplicationAdapter = DS.ActiveModelAdapter.extend();


Watchtower.ApplicationStore = DS.Store.extend({
    cancelQuery: function(type){
        var adapter = this.adapterFor(this.modelFor(type));
        if(typeof adapter.cancelQuery === 'function'){
            adapter.cancelQuery();
        }
    }
});
