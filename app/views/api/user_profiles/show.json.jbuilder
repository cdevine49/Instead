json.extract! @profile, :id, :first_name, :last_name, :about, :user_id, :headline
json.avatar asset_path(@profile.avatar.image.url) if @profile.avatar
json.partial! @profile.work_experiences, partial: 'api/work_experiences/work_experience', as: :work_experience
