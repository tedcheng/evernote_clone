collection @notebooks
attributes :id, :title, :user_id

child :notes, :object_root => false do
  attributes :id, :title, :body, :location, :notebook_id, :user_id

  child :tags, :object_root => false do
    attributes :id, :name, :user_id, :created_at, :updated_at
  end
end

