class CreateWalls < ActiveRecord::Migration[6.0]
  def change
    create_table :walls do |t|
      t.belongs_to :instance, null: false, foreign_key: true
      t.integer :col
      t.integer :row

      t.timestamps
    end
  end
end
