Evernote.Views.AddNoteView = Backbone.View.extend({
  template: JST['notes/add_note'],
  
  events: {
    "click button.add_note_submit": "submitAddNote"
  },
  
  render: function(){
    var new_note = new Evernote.Models.Note();
    this.$el.html(this.template({note:new_note}));
    return this;
  },
  
  submitAddNote: function(event){
    event.preventDefault();
    var new_note = new Evernote.Models.Note($(".add_note_form").serializeJSON().note);
    
    Evernote.current_notes.create(new_note, {success: function() {
      Evernote.current_note = new_note;
      Evernote.container.render();
    }});
  }


});