class RootController < ApplicationController
  def root
    if current_user
      render :root
    else
      redirect_to new_session_url
    end
  end
  
end
