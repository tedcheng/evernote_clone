Evernote.Views.NotesIndexView = Backbone.View.extend({
  initialize: function() {
    // if (Evernote.current_notebook) {
    //   Evernote.current_notes = Evernote.current_notebook.get("notes");
    //   if (Evernote.current_notes) {
    //     Evernote.current_note = Evernote.current_notes.first();
    //   } else {
    //     Evernote.current_note = new Evernote.Models.Note();
    //   };
    // } else {
    //   debugger
    //   Evernote.current_notebook = new Evernote.Models.Notebook();
    //   Evernote.current_notes = new Evernote.Collections.Notes();      
    //   Evernote.current_note = new Evernote.Models.Note();
    // 
    // };
  },
  
  template: JST['notes/index'],
  
  events: {
    "click .notes .note": "changeNote",
    "click .notes button.deleteNote": "deleteNote",
    "click .notes button.addNote": "addNote"
  },
  
  
  render: function (){
    var content = this.template({
      notes: Evernote.current_notes
    });
    this.$el.html(content);
    return this;
  },
  
  changeNote: function(event){
    var note_id = parseInt($(event.currentTarget).attr("data-id"));
    Evernote.current_note = Evernote.current_notes.get(note_id);
    this.trigger("changeSelection");
  },
  
  deleteNote: function(event){
    event.preventDefault();
    var note_id = parseInt($(event.currentTarget).attr("data-id"));
    var note = Evernote.current_notes.get(note_id);
    note.destroy({
      success: function(){
        Evernote.container.render();
      }
    });
  },
  
  addNote: function(event){
    event.preventDefault();
    var new_note = new Evernote.Models.Note($(".add_note_form").serializeJSON().note);
    
    Evernote.current_notes.create(new_note, {success: function() {
      Evernote.current_note = new_note;
      Evernote.container.render();
    }});
    
    
  }
  
  
  
  
  
});