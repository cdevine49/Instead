class UserProfile < ActiveRecord::Base
  include Addressable
  has_one :photo_join, as: :photoable
  has_one :avatar, through: :photo_join, source: :photo
  belongs_to :user
  has_many :work_experiences
  has_many :educations
end
