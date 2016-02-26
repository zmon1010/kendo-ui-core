#
# Cookbook Name:: kendo_docker
# Recipe:: default
#
# Copyright 2016, Telerik AD
#
# All rights reserved - Do Not Redistribute
#

#================ VARIABLES ==================
new_line = "\n"
tab = "\t"
kendoDirName = "/kendo/"
root = File.absolute_path(File.dirname(__FILE__)).split(kendoDirName)[0] + kendoDirName
mvc_demos_path = root + "wrappers/mvc-6/demos/Kendo.Mvc.Examples/"
docker_image_name = "telerik/kendo_offline_demos"

#Change context dir to kendo root, required by print_version
Dir.chdir(root)

#Add KENDO_VERSION Global variable
require './build/print-version'

#================ INSTALL DOCKER ==================
ruby_block 'fstab' do
    block do
        line_for_insert = new_line + "\#Docker interface with custom IP" + new_line +
	"auto docker0" + new_line +
	"iface docker0 inet static" + new_line +
                tab + "address 10.1.0.1" + new_line +
                tab + "netmask 255.255.255.0" + new_line +
                tab + "bridge_ports dummy0" + new_line +
	        tab + "bridge_stp off" + new_line +
	        tab + "bridge_fd 0" + new_line
        file = Chef::Util::FileEdit.new('/etc/network/interfaces')
        file.insert_line_if_no_match(/docker0/, line_for_insert)
        file.write_file
    end
end

execute 'docker-install' do
  command 'curl -sSL "https://get.docker.com/" | sh'
  not_if { File.exists? '/usr/bin/docker' }
  action :run
end
#for uninstall: sudo apt-get purge docker-engine

