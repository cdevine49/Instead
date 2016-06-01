class AddColumnToAddresses < ActiveRecord::Migration
  def change
    add_column :addresses, :_type, :string
    remove_column :addresses, :type, :string
  end
end
