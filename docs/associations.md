User
  has_one :profile
  has_many :firms

UserProfile
  belongs_to :user
  has_many :addresses, as :addressable
  has_many :albums
  has_many :photos, as :imageable

Photo
  belongs_to :imageable, polymorphic: true

Album
  belongs_to :user_profile  
  has_many :photos, as :imageable

Firm
  belongs_to :user
  has_many :addresses, as :addressable (2)

Address
  belongs_to :addressable, polymorphic: true
