Evernote.Views.NotebooksIndexView = Backbone.View.extend({ 
  
  initialize: function() {
    // if (Evernote.notebooks.first()){
    //   Evernote.current_notebook = Evernote.notebooks.first();
    // } else {
    //   Evernote.current_notebook = new Evernote.Models.Notebook();
    // };
    
  },
  
  template: JST['notebooks/index'],
  
  events: {
    "click .notebooks .notebook": "changeNotebook",
    "click .notebooks .tag": "changeTag",
    "click .notebooks button.deleteNotebook": "deleteNotebook",
    "click .notebooks button.editNotebook": "showEditNotebook",
    "click button.addNotebookSubmit": "addNotebookSubmit",
    "click button.deleteTag": "deleteTag"
    
    
    
  },
  
  render: function (){
    var content = this.template({
      notebooks: Evernote.notebooks,
      tags: Evernote.tags
    });
    this.$el.html(content);
    return this;
  },
  
  deleteTag: function(event){
    event.preventDefault();
    var tag_id = parseInt($(event.currentTarget).attr("data-id"));
    var tag = Evernote.tags.get(tag_id);
    tag.destroy({
      success: function(){
        Evernote.container.render();
      }
    });
  },
  
  
  changeNotebook: function(event){
    
    var notebook_id = parseInt($(event.currentTarget).attr("data-id"));
    Evernote.current_notebook = Evernote.notebooks.get(notebook_id);
    Evernote.current_notes = Evernote.current_notebook.get("notes");
    if (Evernote.current_notes) {
      Evernote.current_note = Evernote.current_notes.first();
    } else {
      Evernote.current_note = new Evernote.Models.Notebook();
    };

    this.trigger("changeSelection");
  },
  
  changeTag: function(event){    
    var tag_id = parseInt($(event.currentTarget).attr("data-id"));
    Evernote.current_notebook = Evernote.tags.get(tag_id);

    Evernote.current_notebook.fetch({
      success: function(tag_with_notes){
        Evernote.current_notes = new Evernote.Collections.Notes(tag_with_notes.get("notes"));
        if (Evernote.current_notes) {
          Evernote.current_note = Evernote.current_notes.first();
        } else {
          Evernote.current_note = new Evernote.Models.Notebook();
        };
        Evernote.container.render();        
      }
    });
  },
  
  deleteNotebook: function(event){
    event.preventDefault();
    var notebook_id = parseInt($(event.currentTarget).attr("data-id"));
    var notebook = Evernote.notebooks.get(notebook_id);
    notebook.destroy({
      success: function(){
        Evernote.container.render();
      }
    });
    
  },
  
  showEditNotebook: function(event){
    event.preventDefault();
    var notebook_id = parseInt($(event.currentTarget).attr("data-id"));
    var notebook = Evernote.notebooks.get(notebook_id);
    
    var editNotebookView = new Evernote.Views.EditNotebookView({model: notebook});
    $(event.currentTarget.parentElement).html(editNotebookView.render().$el);
  },
  
  addNotebookSubmit: function(event){
    event.preventDefault();
    var new_notebook = new Evernote.Models.Notebook($(".add_notebook_form").serializeJSON().notebook);
    
    Evernote.notebooks.create(new_notebook, {success: function() {
      Evernote.current_notebook = new_notebook;
      Evernote.container.render();
    }});
  }
  
});