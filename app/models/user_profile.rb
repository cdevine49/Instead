class UserProfile < ActiveRecord::Base
  include Addressable

  has_attached_file :avatar, default_url: "missing.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  belongs_to :user

end
