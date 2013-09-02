class UsersController < ApplicationController
  def new
    render :new
  end
  
  def create
    user = User.new(params[:user])
    if user.save
      login(user)
      redirect_to root_url
    else
      redirect_to new_session_url
    end
  end
end
