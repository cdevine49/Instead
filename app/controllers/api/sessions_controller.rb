class Api::SessionsController < ApplicationController
  before_action :require_logged_out!, only: [:new, :create]
  before_action :require_logged_in!, only: [:destroy]

  def show
    logged_in? ? (render json: current_user) :
    (render json: { message: "Not logged in"}, status: 401)
  end

  def create
    user = User.find_by_credentials(
      params[:username],
      params[:password]
    )

    if user && user.is_password?(params[:password])
      login!(user)
      render json: user
    else
      render json: { message: "Invalid Username or Password" }, status: 401
    end
  end

  def destroy
    logout!
    render json: { message: "Logged Out"}
  end
end
