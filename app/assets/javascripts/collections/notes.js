Evernote.Collections.Notes = Backbone.Collection.extend({
  model: Evernote.Models.Note,
  url: '/notes'
});