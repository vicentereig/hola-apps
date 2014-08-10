Watchtower.AppsSearchController = Em.ArrayController.extend({
    term: null,
    selectedApps: function() {
        return this.get('content').filterBy('isSelected', true);
    }.property('content.@each.isSelected')
});
