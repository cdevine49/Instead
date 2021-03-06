Rails.application.routes.draw do
  root to: "static_pages#root"
  mount Attachinary::Engine => "/attachinary"

  namespace :api, defaults: {format: :json} do
    resources :users do
      get 'unique', on: :collection
    end
    resource :session, only: [:show, :create, :destroy]
    resource :user_profile
    resources :photos do
      post 'upload_avatar', on: :collection
    end
    resources :work_experiences
    resources :educations
  end
end
