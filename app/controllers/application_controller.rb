class ApplicationController < ActionController::Base
  protect_from_forgery
  
  helper_method :current_user
  
  def login(user)
    user.set_session_token
    session[:session_token] = user.session_token
    user.save!
  end
  
  def current_user
    session_token = session[:session_token]
    user = User.find_by_session_token(session_token)
    if session_token && user
      user
    else 
      nil
    end
  end
  
  def logout_current_user
    current_user.set_session_token
    current_user.save!
    session[:session_token] = nil
  end

end
