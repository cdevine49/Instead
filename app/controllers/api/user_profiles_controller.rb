class Api::UserProfilesController < ApplicationController

  def update
    @profile = current_user.profile
    if @profile && @profile.update(profile_params)
      render :show
    else
      render json: { message: "Profile wasn't updated" }, status: 422
    end
  end

  def show
    @profile = UserProfile.find_by(user_id: params[:id])
    render :show
  end

  # Right now, this is completely redundant, but it may not stay that way.
  def upload
    @profile = current_user.profile
    if @profile && @profile.update(profile_params)
      render :show
    else
      render json: { message: "Profile wasn't updated" }, status: 422
    end
  end

  private

  def profile_params
    params.require(:user_profile).permit(:first_name, :last_name, :birthday, :about, :avatar)
  end
end
