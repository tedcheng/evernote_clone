Evernote.Models.Tag = Backbone.Model.extend({
  urlRoot: "/tags",
  
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
      name: this.get("name"),
      user_id: this.get("user_id")
    }
    return obj;
  }
  
});
