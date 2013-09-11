object @resource
attributes :id

node :url do |resrouce|
  @resource.resource.url
end