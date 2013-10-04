Evernote.Views.ContainerView = Backbone.View.extend({
  initialize: function() {
    Evernote.selected_notebook_id = Evernote.notebooks.first().id;
    Evernote.selected_notes = Evernote.notebooks.first().get("notes") || new Evernote.Collections.Notes();
    Evernote.selected_note = Evernote.selected_notes.first() || new Evernote.Models.Note();

    
    this.sidebarView = new Evernote.Views.SidebarView();
    this.notesIndexView = new Evernote.Views.NotesIndexView();
    
    
    
    // this.noteShowView = new Evernote.Views.NoteShowView();
    //   
    // 

    //   
    // this.listenTo(this.sidebarView, "changeSelection", this.render);
    // this.listenTo(this.notesIndexView, "changeSelection", this.render);
    // this.listenTo(Evernote.current_notes, "addedNewNote", this.render);
    // this.listenTo(this.noteShowView, "noteUpdated", this.render);
  },
  
  template: JST['container/container'],
  
  render: function() {
    this.$el.html(this.template());
    this.sidebarView.setElement(this.$('.sidebar')).render();
    this.notesIndexView.setElement(this.$('.notes')).render();
    
    // this.noteShowView.setElement(this.$('.content')).render();
    
    return this;
  }
  
});