class Tagging < ActiveRecord::Base
  attr_accessible :note_id, :tag_id, :user_id

  belongs_to :user
  belongs_to :tag
  belongs_to :note

end
