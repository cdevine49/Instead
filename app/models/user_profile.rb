class UserProfile < ActiveRecord::Base
  include Addressable
  belongs_to :user

  has_attachment  :avatar, accept: [:jpg, :png]

end
