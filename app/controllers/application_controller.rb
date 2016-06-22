class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  private
	def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

	def logged_in?
		!!current_user
	end

  def login!(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end

	def logout!
		current_user.try(:reset_session_token!)
		session[:session_token] = nil
	end

  # before actions

	def require_logged_in!
   	render json: { message: "You must be logged in to log out" }, status: 401 unless logged_in?
	end

  def require_logged_out!
    render json: { message: "You are already logged in" }, status: 401 if logged_in?
  end
end
