Rails.application.routes.draw do
  root to: 'colors#index'

  get '/index', to: 'colors#index', as: :index
  get '/:color(.:format)', to: 'colors#show', as: :show

  get '/error_404', to: 'colors#error', as: :error
  match "/404" => "errors#error_404", via: [ :get, :post, :patch, :delete ]
end
