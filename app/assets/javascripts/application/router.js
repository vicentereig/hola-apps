Watchtower.Router.reopen({
    location: 'history'
});

Watchtower.Router.map(function() {
  this.resource('apps', function(){
    this.route('search');
  });
});
