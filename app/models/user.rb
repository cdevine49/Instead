class User < ActiveRecord::Base
  has_many :addresses, as: :addressable

end
