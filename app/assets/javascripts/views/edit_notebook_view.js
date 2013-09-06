Evernote.Views.EditNotebookView = Backbone.View.extend({
  template: JST['notebooks/edit'],
  
  events: {
    "click button.edit_notebook_submit": "submitEditNotebook"
  },
  
  render: function(){
    var content = this.template({
      notebook: this.model
    });
    this.$el.html(content);
    return this;
  },
  
  submitEditNotebook: function(event){
    event.preventDefault();
    var attributes = $(".edit_notebook_form").serializeJSON().notebook;

    Evernote.current_notebook.save(attributes, {success: function() {
      Evernote.container.render();
    }});
  }


});