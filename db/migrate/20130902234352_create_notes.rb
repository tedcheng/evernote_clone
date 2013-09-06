class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title
      t.text :body
      t.integer :notebook_id
      t.integer :user_id
      t.timestamps
    end
  end
end
