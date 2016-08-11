json.extract! @profile, :id, :first_name, :last_name, :about, :user_id
json.avatar asset_path(@profile.avatar.image.url) if @profile.avatar
