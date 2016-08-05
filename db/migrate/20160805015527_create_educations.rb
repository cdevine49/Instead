class CreateEducations < ActiveRecord::Migration
  def change
    create_table :educations do |t|
      t.string :school, null:false
      t.date :start
      t.date :end
      t.string :degree
      t.string :field
      t.string :grade
      t.text :extracurriculars
      t.text :description
      t.integer :user_profile_id, index: true
      t.timestamps
    end
  end
end
