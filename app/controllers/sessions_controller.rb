class SessionsController < ApplicationController
  def new
    render :new
  end
  
  def create
    email = params[:user][:email]
    password = params[:user][:password]

    if User.verify_credentials(email, password)
      user = User.find_by_email(email)
      login(user)
      redirect_to root_url
    else
      redirect_to new_session_url
    end
  end
  
  def destroy
    logout_current_user
    redirect_to new_session_url
  end
  
  
end
