class CreatePhotoJoins < ActiveRecord::Migration
  def change
    create_table :photo_joins do |t|
      t.string :title
      t.text :description
      t.integer :photo_id
      t.integer :photoable_id, index: true
      t.string :photoable_type, index: true
      t.timestamps
    end

  end
end
