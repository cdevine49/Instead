class RemoveDefaults < ActiveRecord::Migration
  def change
    change_column_default :user_profiles, :first_name, nil
    change_column_default :user_profiles, :last_name, nil
  end
end
