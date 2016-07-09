class UserProfile < ActiveRecord::Base
  include Addressable
  belongs_to :user

  has_attached_file  :avatar,
    styles: { normal: "100x100>" },
    default_url: "default-avatar.png"

  validates_attachment :avatar,
    content_type: { content_type: /\Aimage\/.*\Z/ }

  # def process_delayed!
  #   self.job_is_processing = true
  #   self.post_processing = true
  #   reprocess!
  #   self.job_is_processing = false
  # end

end
