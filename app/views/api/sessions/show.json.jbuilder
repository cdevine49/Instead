json.extract! @current_user, :id, :email
json.profile do
  json.first_name @current_user.profile.first_name
  json.last_name @current_user.profile.last_name
  json.birthday @current_user.profile.birthday
  json.about @current_user.profile.about
end
