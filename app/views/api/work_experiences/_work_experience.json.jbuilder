json.extract! work_experience, :id, :company, :position, :description, :location, :user_profile_id
json.start_year work_experience.start.year
json.start_month work_experience.start.month
if work_experience.end
  json.end_year work_experience.end.year
  json.end_month work_experience.end.month
end
