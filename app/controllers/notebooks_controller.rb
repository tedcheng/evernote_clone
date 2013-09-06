class NotebooksController < ApplicationController
  def create
    notebook = Notebook.new(params[:notebook])
    notebook.user_id = current_user.id
    if notebook.save
      render :json => notebook
    else
      render :json => notebook.errors.full_messages, :status => 422
    end
  end
  
  def index
    @notebooks = Notebook.find_all_by_user_id(current_user.id)
    if @notebooks
      render "index.json.rabl"
    else
      render :json => @notebooks.errors.full_messages, :status => 422
    end
  end

  def destroy
    @notebook = Notebook.find_by_id(params[:id])
    if @notebook.destroy
      render :json => @notebook
    else
      render :json => @notebook.errors.full_messages, :status => 422
    end
  end

  def update
    @notebook = Notebook.find_by_id(params[:id])
    @notebook.update_attributes(params[:notebook])
    if @notebook.save
      render :json => @notebook
    else
      render :json => @notebook.errors.full_messages, :status => 422
    end

  end
  
  

end
