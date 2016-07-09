json.extract! @user, :id, :email
json.profile do
  json.first_name @user.profile.first_name
  json.last_name @user.profile.last_name
  json.birthday @user.profile.birthday
  json.about @user.profile.about
end
