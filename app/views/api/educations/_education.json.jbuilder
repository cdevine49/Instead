json.extract! education, :id, :school, :degree, :field, :grade, :extracurriculars, :description, :user_profile_id

if education.start
json.start_year education.start.year
json.start_month education.start.month
end

if education.end
  json.end_year education.end.year
  json.end_month education.end.month
end
