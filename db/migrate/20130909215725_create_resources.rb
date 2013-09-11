class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.attachment :resource
      t.timestamps
    end
  end
end
