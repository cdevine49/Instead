Rails.application.routes.draw do
  root to: "static_pages#root"
  mount Attachinary::Engine => "/attachinary"

  namespace :api, defaults: {format: :json} do
    resources :users do
      get 'unique', on: :collection
    end
    resource :session, only: [:show, :create, :destroy]
    resource :user_profile
    resources :photos
  end
end
