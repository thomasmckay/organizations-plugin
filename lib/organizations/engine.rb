module Organizations
  class Engine < ::Rails::Engine
    isolate_namespace Organizations

    initializer 'katello.mount_engine', :after => :build_middleware_stack do |app|
      app.routes_reloader.paths << "#{Organizations::Engine.root}/config/mount_engine.rb"
    end

    initializer "organizations.paths" do |app|
      app.routes_reloader.paths.unshift("#{Organizations::Engine.root}/config/overrides.rb")
    end

  end
end
