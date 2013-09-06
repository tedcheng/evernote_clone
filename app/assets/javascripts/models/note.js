Evernote.Models.Note = Backbone.Model.extend({
  urlRoot: "/notes",
  
  notebook_title: function() {
    var that = this;
    var notebook_title = null;
    Evernote.notebooks.each(function(notebook){
      if (notebook.id === that.get("notebook_id")){
        notebook_title = notebook.get("title");
        return false;
      };
    });
    return notebook_title;
  }
  
});