Evernote.Views.NotebooksIndexView = Backbone.View.extend({
  
  initialize: function() {
    this.collection = Evernote.notebooks;
    
    var that = this;
    var events = ["change", "destroy", "add"];
    events.forEach(function (event) {
      that.listenTo(that.collection, event, that.render);
    });
        
  },
  
  template: JST['sidebar/notebooks'],
  edit_template: JST['sidebar/notebook_edit'],
  
  events: {
    "click .notebooks button.deleteNotebook": "deleteNotebook",
    "click .notebooks button.editNotebook": "showEditNotebook",
    "click button.edit_notebook_submit": "submitEditNotebook",
    "click button.addNotebookSubmit": "addNotebookSubmit",
    "click .notebooks .notebook": "selectNotebook"  
  },
  
  render: function (){
    this.$el.html(this.template({notebooks: this.collection}));
    
    // console.log("rendered");
    
    return this;
  },
  
  showEditNotebook: function(event){
    event.preventDefault();
    var notebook_id = parseInt($(event.currentTarget).attr("data-id"));
    var notebook = this.collection.get(notebook_id);
    $(event.currentTarget.parentElement).html(this.edit_template({notebook: notebook}));
  },

  submitEditNotebook: function(event){
    event.preventDefault();
    var notebook_id = parseInt($(event.currentTarget).attr("data-id"));
    var notebook = this.collection.get(notebook_id);
    var notebook_title = $(".edit_notebook_form").serializeJSON().notebook.title;
    notebook.save("title", notebook_title);
    
  },
  
  deleteNotebook: function(event){
    event.preventDefault();
    var notebook_id = parseInt($(event.currentTarget).attr("data-id"));
    var notebook = Evernote.notebooks.get(notebook_id);
    notebook.destroy();
  },  
  
  addNotebookSubmit: function(event){
    event.preventDefault();
    var new_notebook = new Evernote.Models.Notebook($(".add_notebook_form").serializeJSON().notebook);
    
    Evernote.notebooks.create(new_notebook);
  },
  
  selectNotebook: function(event){
    $("span.notebook").removeClass("selected");
    $(event.currentTarget).addClass("selected");
    
    Evernote.selected_notebook_id = parseInt($(event.currentTarget).attr("data-id"));
    var selected_notebook = this.collection.get(Evernote.selected_notebook_id);
    Evernote.selected_notes.reset(selected_notebook.get("notes"));

    
    
    if (Evernote.selected_notes) {
      Evernote.selected_note.set(Evernote.selected_notes.first());
    } else {
      Evernote.selected_note.set(new Evernote.Models.Notebook());
    };
    

  },
  

  

  

  






  //TODO: this needs to be moved to tags_index_view.js
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
  }
  
  
  
  
});