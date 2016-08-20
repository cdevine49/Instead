class WorkExperience < ActiveRecord::Base
  belongs_to :user_profile
  include Addressable
  # run migration to require start time
  # validate end time || current job check box
end
