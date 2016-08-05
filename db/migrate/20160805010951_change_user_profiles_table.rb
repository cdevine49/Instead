class ChangeUserProfilesTable < ActiveRecord::Migration
  def change
    remove_column :user_profiles, :birthday, :date
    remove_column :user_profiles, :education_id, :integer
    remove_column :user_profiles, :work_experience_id, :integer
  end
end
