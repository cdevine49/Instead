User
  has_one :profile
  has_many :firms
  has_many :addresses, as :addresable

Profile
  belongs_to :user

Firm
  belongs_to :user
  has_many :addresses, as :addresable (2)

Address
  belongs_to : addresable, polymorphic: true
