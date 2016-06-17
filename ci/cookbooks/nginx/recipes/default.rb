package "nginx"

cookbook_file '/etc/nginx/nginx.conf' do
    source 'nginx.conf'
end
directory '/var/www/kendo-ui' do
    action :create_if_missing
end
file '/var/www/kendo-ui/redirects.conf' do
    action :create_if_missing
end

service 'nginx' do
    action :restart
end

package 'incron'

cookbook_file '/etc/incron.d/in-modify-nginx-redirects' do
    source 'in-modify-nginx-redirects'
end

service 'incron' do
    action :restart
end
