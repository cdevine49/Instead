class UserProfile < ActiveRecord::Base
  include Addressable
  belongs_to :user

  has_attached_file  :avatar,
    default_url: "default-avatar.png"

  validates_attachment :avatar,
    content_type: { content_type: /\Aimage\/.*\Z/ }

end
