class TaggingsController < ApplicationController
  def create
    @tagging = Tagging.new(params[:tagging])
    if @tagging.save
      render :json => @tagging.tag
    else
      render :json => @tagging.errors.full_messages, :status => 422
    end
    
    
  end
  
  def destroy
    @tagging = Tagging.find_by_tag_id_and_note_id(params[:tag_id], params[:note_id])
    if @tagging.destroy
      render :json => @tagging.tag
    else
      render :json => @tagging.errors.full_messages, :status => 422
    end
    
  end
  


end
