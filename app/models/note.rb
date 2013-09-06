class Note < ActiveRecord::Base
  attr_accessible :body, :notebook_id, :title, :user_id
  
  belongs_to :user
  belongs_to :notebook
  has_many :taggings
  has_many :tags, :through => :taggings
end
