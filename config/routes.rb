Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :show, :new, :create, :destroy]
    resource :session, only: [:show, :create, :destroy]
  end
end
