Evernote.Views.ContainerView = Backbone.View.extend({
  initialize: function() {
    this.notebooksIndexView = new Evernote.Views.NotebooksIndexView();
    this.notesIndexView = new Evernote.Views.NotesIndexView();
    this.noteShowView = new Evernote.Views.NoteShowView();
  
    
    Evernote.current_notebook = Evernote.notebooks.first() || new Evernote.Models.Notebook();
    
    Evernote.current_notes = Evernote.current_notebook.get("notes") || new Evernote.Collections.Notes();
    
    Evernote.current_note = Evernote.current_notes.first() || new Evernote.Models.Note();
  
    
    this.listenTo(this.notebooksIndexView, "changeSelection", this.render);
    this.listenTo(this.notesIndexView, "changeSelection", this.render);
    this.listenTo(Evernote.current_notes, "addedNewNote", this.render);
    this.listenTo(this.noteShowView, "noteUpdated", this.render);
  },
  
  template: JST['container/container'],
  
  render: function() {
    this.$el.html(this.template());

    this.notebooksIndexView.setElement(this.$('.notebooks')).render();
        
    this.notesIndexView.setElement(this.$('.notes')).render();
    
    this.noteShowView.setElement(this.$('.content')).render();
    
    return this;
  }
  
});