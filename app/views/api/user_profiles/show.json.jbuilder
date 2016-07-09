json.extract! @profile, :id, :first_name, :last_name, :birthday, :about, :user_id
json.avatar asset_path(@profile.avatar.url(:normal))
