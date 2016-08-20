json.extract! @profile, :id, :first_name, :last_name, :about, :user_id, :headline, :work_experiences
json.avatar asset_path(@profile.avatar.image.url) if @profile.avatar
