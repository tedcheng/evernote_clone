Evernote.Views.NotesIndexView = Backbone.View.extend({
  initialize: function() {

    this.collection = Evernote.selected_notes;
  },
  
  template: JST['notes/index'],
  
  events: {
    "click .notes button.addNote": "addNote",
    "click .notes button.deleteNote": "deleteNote",
    "click .notes .note": "changeNote"

  },
  
  render: function (){
    this.$el.html(this.template({notes: this.collection}));
    return this;
  },
  
  addNote: function(event){
    event.preventDefault();
    var new_note = new Evernote.Models.Note($(".add_note_form").serializeJSON().note);
    
    Evernote.current_notes.create(new_note, {success: function() {
      Evernote.current_note = new_note;
      Evernote.container.render();
    }});  
    
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
  
  
  
  
  
  
});