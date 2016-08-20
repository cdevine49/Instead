class AddDefaultValuesToUserProfile < ActiveRecord::Migration
  def change
    change_column :user_profiles, :first_name, :string, default: ""
    change_column :user_profiles, :last_name, :string, default: ""
    change_column :user_profiles, :about, :string, default: ""
  end
end
