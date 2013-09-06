class Tag < ActiveRecord::Base
  attr_accessible :name, :user_id

  belongs_to :user
  has_many :taggings, :dependent => :destroy
  has_many :notes, :through => :taggings
end
