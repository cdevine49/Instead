class Api::UsersController < ApplicationController
  before_action :require_logged_out!, :only => [:create]
  before_action :require_logged_in!, :only => [:update]

  def create
    user = User.new(user_params)

    if user.save
      login!(user)
      render json: user
    else
      render json: { message: "User wasn't saved" }
    end
  end

  def update
    if current_user.update(user_params)
      render json: user
    else
      render json: { message: "User wasn't updated" }
    end
  end

  def index
    @users = User.all
  end

  def show
    @user = User.find_by(user_params)
    render :show
  end

  def destroy

  end

  def unique
    render json: !User.find_by(user_params)
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
