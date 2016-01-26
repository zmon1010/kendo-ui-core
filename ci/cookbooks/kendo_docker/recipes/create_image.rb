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

docker_installation_script 'default' do
  repo 'main'
  script_url 'https://get.docker.com/'
  action :create
end

#================ RUN DOCKER IMAGE SECTION ==================
#test docker image:
#docker_image 'viliev/kendo_offline_demos' do
#        tag 'v3'
#        action :pull
#end

#docker_container 'viliev/kendo_offline_demos:v3' do
#        detach true
#        port '888:5000'
#        container_name 'web'
#        #image_name:
#        repo 'viliev/kendo_offline_demos'
#        tag 'v3’
#end

#================ CREATE DOCKER IMAGE SECTION ==================

#Create Dockerfile in %KENDO_REPOSITORY%/wrappers/mvc-6/demos/Kendo.Mvc.Examples/Dockerfile
#

#COPY project.json /app/
#WORKDIR /app
#RUN ["dnu", "restore"]
#COPY . /app

#RUN apt-get update && apt-get install -y \
#    sqlite3 libsqlite3-dev

#EXPOSE 5000
#ENTRYPOINT ["dnx", "-p", "project.json", "kestrel"]


docker_contents = "FROM microsoft/aspnet:1.0.0-rc1-final-coreclr" + new_line +
	new_line +
	"COPY project.json /app/" + new_line +
	"WORKDIR /app" + new_line +
	'RUN ["dnu", "restore"]' + new_line +
	"COPY . /app" + new_line +
	"RUN apt-get update && apt-get install -y \" + new_line +
	tab + "sqlite3 libsqlite3-dev" + new_line +
	new_line +
	"EXPOSE 5000" + new_line +
	'ENTRYPOINT ["dnx", "-p", "project.json", "kestrel"]'


file '/kendo/wrappers/mvc-6/demos/Kendo.Mvc.Examples/Dockerfile' do
  content docker_contents
end


