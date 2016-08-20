class ChangeWorkExperiencesTable < ActiveRecord::Migration
  def change
    change_column :work_experiences, :start, :date, null: false
    add_column :work_experiences, :location, :string
  end
end
