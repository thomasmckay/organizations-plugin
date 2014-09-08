require_dependency "organizations/application_controller"

module Organizations
  class OrganizationsController < Organizations::ApplicationController

    before_filter :authorize

    def rules
      {
        :index => lambda {true},
        :plugin => lambda {true}
      }
    end

    def index
      render 'organizations/layouts/application', :layout => false
    end

    def plugin
      render 'organizations/layouts/application', :layout => false, :anchor => '/organizations'
    end
  end
end
