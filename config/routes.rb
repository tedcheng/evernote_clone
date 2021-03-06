Evernote::Application.routes.draw do
  mount Rich::Engine => '/rich', :as => 'rich'

  get "tags/index"

  get "tags/create"

  get "tags/destroy"

  get "tags/update"

  resources :users, :only => [:new, :create]
  resource :session, :only => [:new, :create, :destroy]
  resources :notebooks, :except => [:new, :edit]
  resources :notes, :except => [:new, :edit]
  resources :tags, :except => [:new, :edit]
  resources :taggings, :only => [:create]
  delete '/taggings', to: 'taggings#destroy'
  resources :resources
  root :to => "root#root"
end
