class AddDefaultNotebookIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :default_notebook_id, :integer
  end
end
