class CreateInstances < ActiveRecord::Migration[6.0]
  def change
    create_table :instances do |t|
      t.integer :start_node_col
      t.integer :start_node_row
      t.integer :end_node_col
      t.integer :end_node_row
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
