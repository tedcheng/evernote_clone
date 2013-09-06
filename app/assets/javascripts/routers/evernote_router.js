Evernote.Routers.EvernoteRouter = Backbone.Router.extend({
  routes:{
   "":"index"
  },
  
  index: function() {
    Evernote.notebooks = new Evernote.Collections.Notebooks();
    Evernote.tags = new Evernote.Collections.Tags();
    Evernote.notebooks.fetch({
      success: function(){
        Evernote.tags.fetch({
          success: function(){
            Evernote.container = new Evernote.Views.ContainerView();
            $(".container").html(Evernote.container.render().$el);                      
          }
        });
      },
      error: function(){
        Evernote.container = new Evernote.Views.ContainerView();
        $(".container").html(Evernote.container.render().$el);
      }
    });
  }
});