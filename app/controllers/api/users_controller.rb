class Api::UsersController < ApplicationController
  before_filter :require_no_current_user!, :only => [:new, :create]

  def new
    @user = User.new
  end

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
    
  end

  def show
    user = User.find_by(user_params)
    user ? # render true : render false
  end

  def destroy

  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
