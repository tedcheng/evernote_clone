Evernote.Views.NoteShowView = Backbone.View.extend({
  template: JST['notes/show'],
  makeTags: JST['notes/makeTags'],
  
  events: {
    "click button.add_note": "showAddNote",
    "click button.edit_note_submit": "submitEditNote",
    "click button.deleteTagging": "deleteTagging",
    "click a.addTagging": "addTagging",
    "click input.newTagNameInput": "inputTagName",
    "click button.createTag": "createTag",
    'mousedown .editable': 'editableClick',
    "keyup .edit_note_content": "autoSave"
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
  
  
  
  autoSave: _.debounce(function(event){
    
    event.preventDefault();
    var attributes = $(".edit_note_form").serializeJSON().note;
    attributes.body = $("div.edit_note_content.body").html();
    
    Evernote.current_note.save(attributes, {success: function() {
      
      // Evernote.container.render();
      
    }});  
  }, 250),
  
  
  // autoSave: function(event){
  //   tagging
  //   event.preventDefault();
  //   var attributes = $(".edit_note_form").serializeJSON().note;
  //   var that = this
  //   Evernote.current_note.save(attributes, {success: function() {
  // 
  //     that.trigger("noteUpdated");
  //   }});
  // },
  
  inputTagName: function(event){
    event.stopPropagation();
  },
  
  createTag: function(event){
    
    event.preventDefault();
    var attributes = $(".create_tag_form").serializeJSON().tag;
    var new_tag = new Evernote.Models.Tag(attributes);
    Evernote.tags.create(new_tag, { success: function() {
      
      Evernote.container.render();
    }});
    
  },
  
  
  deleteTagging: function(event){
    event.preventDefault();
    var tag_id = parseInt($(event.currentTarget).attr("data-id"));
    var note_id = Evernote.current_note.id;
    
    $.ajax({
      type: "DELETE",
      url: "/taggings",
      data: {tag_id: tag_id, note_id: note_id},
      success: function(tag_obj) {
        
        
        Evernote.current_note.get("tags").forEach(function(tag, idx) {
          if (tag.id === tag_obj.id) {Evernote.current_note.get("tags").splice(idx, 1);};
        });
        

        Evernote.container.render();
      }
    });
  },
  
  
  addTagging: function(event){
    event.preventDefault();
    var tag_id = parseInt($(event.currentTarget).attr("data-id"));
    var note_id = Evernote.current_note.id;
    
    $.ajax({
      type: "POST",
      url: "/taggings",
      data: {tagging: {tag_id: tag_id, note_id: note_id}},
      success: function(tag_obj) {       
        Evernote.current_note.get("tags").push(tag_obj);
        Evernote.container.render();
      }
    });
  },
  
  editableClick: etch.editableInit
  
  
  
  
});