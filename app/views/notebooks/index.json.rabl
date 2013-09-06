collection @notebooks, :object_root => false
attributes :id, :title, :user_id

child :notes, :object_root => false do
  attributes :id, :title, :body, :location, :notebook_id, :user_id

  child :tags, :object_root => false do
    attributes :id, :name, :user_id
  end
end

