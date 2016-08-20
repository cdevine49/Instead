class ChangeColumnsUserProfilesTable < ActiveRecord::Migration
  def change
    change_column_default :user_profiles, :first_name, nil
    change_column_default :user_profiles, :last_name, nil
    change_column_default :user_profiles, :about, nil
    change_column :user_profiles, :first_name, :string, null: false
    change_column :user_profiles, :last_name, :string, null: false
  end
end
