class UserProfile < ActiveRecord::Base
  include Addressable
  has_one :photo_join, as: :photoable
  has_one :avatarX, through: :photo_join, source: :photo
  belongs_to :user

  has_attached_file :avatar,
    default_url: "default-avatar.png"

  validates_attachment :avatar,
    content_type: { content_type: /\Aimage\/.*\Z/ }

end
