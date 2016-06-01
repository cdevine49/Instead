class CreateUserProfiles < ActiveRecord::Migration
  def change
    create_table :user_profiles do |t|
      t.string :first_name
      t.string :last_name
      t.date :birthday
      t.text :about
      t.integer :user_id
    end

    add_index :user_profiles, :user_id, unique: true
  end
end
