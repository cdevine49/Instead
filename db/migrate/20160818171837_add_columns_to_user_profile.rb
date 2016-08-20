class AddColumnsToUserProfile < ActiveRecord::Migration
  def change
    add_column :user_profiles, :headline, :string, default: 'default'
    change_column_null :user_profiles, :headline, false
    change_column_default :user_profiles, :headline, nil
  end
end
