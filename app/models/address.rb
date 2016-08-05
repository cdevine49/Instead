class Address < ActiveRecord::Base
  belongs_to :addressable, polymorphic: true
  # _type column for home / work / billing, not to do with polymorphism
end
