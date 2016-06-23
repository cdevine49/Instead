class Api::SessionsController < ApplicationController
  before_action :require_logged_out!, only: [:create]
  before_action :require_logged_in!, only: [:destroy]

  def show
    if logged_in?
      # @user = current_user
      render :show
    else
      render json: { message: "Please login" }, status: 401
    end
  end

  def create
    email = params[:user][:email]
    password = params[:user][:password]
    user = User.find_by_credentials(email, password)

    if user && user.is_password?(params[:user][:password])
      login!(user)
      render :show
    else
      render json: { message: "Invalid Username or Password" }, status: 401
    end
  end

  def destroy
    logout!
    render json: { message: "Logged out" }
  end
end
