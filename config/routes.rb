Organizations::Engine.routes.draw do
  namespace 'organizations' do
    match 'plugin' => 'organizations#plugin', :via => :get

    # namespace 'api' do
    #   match 'index' => 'organizations#index', :via => :get
    #   match ':id/show' => 'organizations#show', :via => :get
    #   match '' => 'organizations#create', :via => :post
    # end
  end
end
