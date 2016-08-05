class CreateWorkExperiences < ActiveRecord::Migration
  def change
    create_table :work_experiences do |t|
      t.string :company, null:false
      t.string :position, null:false
      t.date :start
      t.date :end
      t.text :description
      t.integer :user_profile_id
      t.timestamps
    end
  end
end
