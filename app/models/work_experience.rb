class WorkExperience < ActiveRecord::Base
  belongs_to :user_profile
  include Addressable

  validates_presence_of :company, :position, :start

end
