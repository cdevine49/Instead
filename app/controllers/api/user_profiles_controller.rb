class Api::UserProfilesController < ApplicationController

  def create
    debugger
    profile = UserProfile.new(profile_params)
    if profile.save
      render json: profile
    else
      render json: { message: "User profile wasn't saved" }
    end
  end



  private

  def profile_params
    params.require(:user_profile).permit(:first_name, :last_name, :birthday, :about)
  end
end
