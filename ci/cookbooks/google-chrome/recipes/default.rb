apt_repository "google" do
  uri "http://dl.google.com/linux/chrome/deb/ "
  components ["stable", "main"]
  key "https://dl-ssl.google.com/linux/linux_signing_key.pub"
end

package "chromium-browser" do
    action :install
end
case node['platform_family']
when 'windows'
  include_recipe 'chrome::msi'
when 'mac_os_x'
  include_recipe 'chrome::dmg'
when 'rhel', 'fedora'
  include_recipe 'chrome::yum'
when 'debian'
  include_recipe 'chrome::apt'
else
  Chef::Log.warn('Chrome cannot be installed on this platform using this cookbook.')
end
