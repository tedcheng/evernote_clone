Evernote.Views.NoteShowView = Backbone.View.extend({
  template: JST['notes/show'],
  makeTags: JST['notes/makeTags'],
  
  events: {
    "click button.add_note": "showAddNote",
    "click button.edit_note_submit": "submitEditNote"
  },
  
  render: function (){
    var content = this.template({
      note: Evernote.current_note
    });
    this.$el.html(content);
    
    return this;
  },
  
  showAddNote: function(){
    var addNoteView = new Evernote.Views.AddNoteView();
    $("div.content").html(addNoteView.render().$el)
  },
  
  submitEditNote: function(event){
    event.preventDefault();
    var attributes = $(".edit_note_form").serializeJSON().note;
    var that = this
    Evernote.current_note.save(attributes, {success: function() {

      that.trigger("noteUpdated");
    }});
  }
  
});