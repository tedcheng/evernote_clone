class ResourcesController < ApplicationController
  def create
    p params
    @resource = Resource.new();
    @resource.resource = params[:resource];
    if @resource && @resource.save
      render "show.json.rabl"
    else
      render :json => @resource.errors.full_messages, :status => 422
    end
    
  end
  
  
  
  
end
