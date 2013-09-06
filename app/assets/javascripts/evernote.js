window.Evernote = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Evernote.Routers.EvernoteRouter();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Evernote.initialize();
});
