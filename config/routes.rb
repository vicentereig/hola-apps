Rails.application.routes.draw do
  get 'ng_application' => 'ng_application#index'
  root to: 'application#index'

  namespace :api do
    resources :software, only: 'index'
  end

  get '*path' => 'application#index'
end
