object @organization

extends 'api/v2/organizations/show'

node :resource_types do |organization|
  organization.permissions.collect do |permission|
    permission.resource_type
  end.uniq
end

child :filters => :filters do
  extends 'organizations/api/organizations/filter'
end