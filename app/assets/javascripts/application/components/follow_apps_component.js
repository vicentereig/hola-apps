Watchtower.FollowAppsComponent = Ember.Component.extend({
    threshold: Infinity,

    groupApps: function(){
        return this.get('selectedApps.length') > this.get('threshold');
    }.property('selectedApps.length'),

    firstApp: Ember.computed.alias('selectedApps.firstObject'),

    appBucket: function() {
        var apps;
        apps = this.get('selectedApps');
        return apps.slice(1, apps.length);
    }.property('selectedApps'),

    actions: {
        unselectAll: function() {
            this.get('selectedApps').forEach(function(app){
                app.set('isSelected', false)
            });
        }
    }
});
