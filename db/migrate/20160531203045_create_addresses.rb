class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.string :street
      t.string :type
      t.string :town
      t.string :state
      t.integer :zip_code
      t.string :country
      t.references :addressable, polymorphic: true, index: true
      t.timestamps
    end
  end
end
