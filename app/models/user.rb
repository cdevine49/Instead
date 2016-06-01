class User < ActiveRecord::Base
  has_one :profile, class_name: 'UserProfile'
  # build_profile not profile.new
end
