User
  has_one :profile
  has_many :firms


UserProfile
  belongs_to :user
  has_many :addresses, as :addressable
  
Firm
  belongs_to :user
  has_many :addresses, as :addressable (2)

Address
  belongs_to : addressable, polymorphic: true
