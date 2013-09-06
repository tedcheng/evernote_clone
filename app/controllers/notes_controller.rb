class NotesController < ApplicationController
  def create
    note = Note.new(params[:note])
    note.user_id = current_user.id
    note.notebook_id ||= current_user.default_notebook_id
    if note.save
      render :json => note
    else
      render :json => note.errors.full_messages, :status => 422
    end
  end
  
  def index
    @notes = Note.find_all_by_user_id(current_user.id).order('updated_at asc')
    if @notes
      render :json => @notes
    else
      render :json => @notes.errors.full_messages, :status => 422
    end
  end
  

  def update
    @note = Note.find_by_id(params[:id]);
    @note.update_attributes(params[:note]);
    if @note.save
      render :json => @note
    else
      render :json => @note.errors.full_messages, :status => 422
    end
    
  end
  
  def destroy
    @note = Note.find_by_id(params[:id]);
    if @note.destroy
      render :json => @note
    else
      render :json => @note.errors.full_messages, :status => 422
    end
  end
   




end
