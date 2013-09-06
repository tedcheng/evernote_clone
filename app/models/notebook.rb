class Notebook < ActiveRecord::Base
  attr_accessible :title, :user_id
  
  has_many :notes, :dependent => :destroy
  belongs_to :user
end
