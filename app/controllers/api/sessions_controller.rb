class Api::SessionsController < ApplicationController
  before_action :require_logged_out!, only: [:create]
  before_action :require_logged_in!, only: [:destroy]

  def show
    logged_in? ? (render json: current_user.email) :
    (render json: { message: "Please login" }, status: 401)
  end

  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if user && user.is_password?(params[:user][:password])
      login!(user)
      render json: user.email
    else
      render json: { message: "Invalid Username or Password" }, status: 401
    end
  end

  def destroy
    logout!
    render json: { message: "Logged out" }
  end
end
