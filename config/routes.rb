Rails.application.routes.draw do
  root to: 'application#index'

  namespace :api do
    resources :software, only: 'index'
  end

  get '*path' => 'application#index'
end
