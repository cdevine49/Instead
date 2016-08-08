class Api::UsersController < ApplicationController
  before_action :require_logged_out!, :only => [:create, :unique]
  before_action :require_logged_in!, :only => [:update, :destroy]
  before_action :require_current_user!, :only => [:update, :destroy]

  def create
    @user = User.new(user_params)
    debugger
    if @user.save
      @user.profile = UserProfile.new
      login!(@user)
      render :show
    else
      render json: { message: "User wasn't saved" }, status: 422
    end
  end

  def update
    @user = current_user
    if @user.update(user_params)
      render :show
    else
      render json: { message: "User wasn't updated" }, status: 422
    end
  end

  def destroy
    User.find(params[:id]).destroy
    render json: { message: "You're account has been closed" }
  end

  def unique
    render json: !User.find_by(user_params)
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
