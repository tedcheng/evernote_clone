class TagsController < ApplicationController
  def create
    tag = Tag.new(params[:tag])
    tag.user_id = current_user.id
    if tag.save
      render :json => tag
    else
      render :json => tag.errors.full_messages, :status => 422
    end
  end
  
  def index
    @tags = Tag.find_all_by_user_id(current_user.id)
    render :json => @tags
  end

  def show
    @tag = Tag.find_by_id(params[:id])
    render "show.json.rabl"
  end

  def destroy
    @tag = Tag.find_by_id(params[:id])
    if @tag.destroy
      render :json => @tag
    else
      render :json => @tag.errors.full_messages, :status => 422
    end
  end

  def update
    @tag = Tag.find_by_id(params[:id])
    @tag.update_attributes(params[:tag])
    if @tag.save
      render :json => @tag
    else
      render :json => @tag.errors.full_messages, :status => 422
    end

  end
end

