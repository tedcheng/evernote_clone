Evernote.Models.Notebook = Backbone.Model.extend({
  parse: function(data) {
    if (data.notes) {
      data.notes = new Evernote.Collections.Notes(data.notes);
    } else {
      data.notes = new Evernote.Collections.Notes();
    };
    return data;
  },
  
  toJson: function() {
    var obj = {
      id: this.id,
      title: this.get("title"),
      user_id: this.get("user_id")
    }
    return obj;
  }
  
    
});