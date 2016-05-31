User
  has_one :profile
  has_many :firms
  has_many :addresses, as :addressable

Profile
  belongs_to :user

Firm
  belongs_to :user
  has_many :addresses, as :addressable (2)

Address
  belongs_to : addressable, polymorphic: true
