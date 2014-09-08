Foreman::Application.routes.draw do

  scope :organizations, :module => :organizations do
    match '/organizations' => 'organizations#plugin', :via => :get
  end

end
