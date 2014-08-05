var attr = DS.attr;

Watchtower.AppAdapter =  DS.RESTAdapter.extend({
    pathForType: function(type) {
        return 'software';
    },
    jqXHRs: [],
    ajaxOptions: function(url, type, hash) {
        // Get default AjaxOptions
        var ajaxOptions = this._super(url, type, hash);

        // If the function was defined in the DS.RESTAdapter object,
        // we must call it in out new beforeSend hook.
        var defaultBeforeSend = function(){};
        if(typeof ajaxOptions.beforeSend === 'function'){
            defaultBeforeSend = ajaxOptions.beforeSend;
        }
        ajaxOptions.beforeSend = function(jqXHR, settings){
            defaultBeforeSend(jqXHR, settings);
            this.jqXHRs.push(jqXHR); // Keep the jqXHR somewhere.
            var lastInsertIndex = this.jqXHRs.length - 1;
            jqXHR.always(function(){
                // Destroy the jqXHRs because the call is finished and
                // we don't need it anymore.
                this.jqXHRs.splice(lastInsertIndex,1);
            });
        };

        return ajaxOptions;
    },

    cancelQuery: function(){
        this.jqXHRs.forEach(function(req){
            req.abort();
        });
    }
});

Watchtower.App = DS.Model.extend({
    trackName: DS.attr('string'),
    description: DS.attr('string'),
    artistName: DS.attr('string'),
    artworkUrl60: DS.attr('string'),
    userRatingCount: DS.attr('number'),
    version: DS.attr('string'),
    averageUserRating: DS.attr('number')
});
