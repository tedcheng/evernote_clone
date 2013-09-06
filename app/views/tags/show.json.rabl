object @tag
attributes :id, :name, :user_id

child :notes, :object_root => false do
  attributes :id, :title, :body, :location, :tag_id, :user_id
end
