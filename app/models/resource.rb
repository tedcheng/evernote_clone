class Resource < ActiveRecord::Base
  attr_accessible :resource
  
  
  has_attached_file :resource
  
end
