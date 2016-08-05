class Education < ActiveRecord::Base
  belongs_to :user_profile
  include Addressable
end
