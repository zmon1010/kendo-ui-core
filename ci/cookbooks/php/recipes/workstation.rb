package "php-cli"
package "php-fpm"
package "php-gd"
package "php-sqlite3"
package "php-json"

template "/etc/php/7.0/fpm/pool.d/www.conf" do
    source "workstation.conf.erb"
    variables({
        :process_user => "www-data",
        :process_group => "www-data"
    })
end

service "php7.0-fpm" do
    case node["platform"]
    when "ubuntu"
        if node["platform_version"].to_f >= 15.00
            provider Chef::Provider::Service::Systemd
        end
    end
    action :restart
end
