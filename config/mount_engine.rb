Foreman::Application.routes.draw do
  mount Organizations::Engine, :at => '/', :as => 'organizations'
end
