class Education < ActiveRecord::Base
  include Addressable
  include SetDate
  belongs_to :user_profile
end
