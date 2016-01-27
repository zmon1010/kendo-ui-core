#
# Cookbook Name:: kendo_docker
# Recipe:: default
#
# Copyright 2016, Telerik AD
#
# All rights reserved - Do Not Redistribute
#

require 'version'

#================ VARIABLES ==================
new_line = "\n"
tab = "\t"
kendoDirName = "/kendo/"
root = File.absolute_path(File.dirname(__FILE__)).split(kendoDirName)[0] + kendoDirName
mvc_demos_path = root + "wrappers/mvc-6/demos/Kendo.Mvc.Examples/"
docker_image_name = "telerik/kendo_offline_demos"

#================ INSTALL DOCKER ==================
#ruby_block 'fstab' do
#    block do
#        line_for_insert = new_line + "\#Docker interface with custom IP" + new_line +
#	"auto docker0" + new_line +
#	"iface docker0 inet static" + new_line +
#        	tab + "address 10.1.0.1" + new_line +
#	        tab + "netmask 255.255.255.0" + new_line +
#        	tab + "bridge_ports dummy0" + new_line +
#	        tab + "bridge_stp off" + new_line +
#	        tab + "bridge_fd 0" + new_line
#        file = Chef::Util::FileEdit.new('/etc/network/interfaces')
#        file.insert_line_if_no_match(/docker0/, line_for_insert)
#        file.write_file
#    end
#end

#docker_installation_script 'default' do
#  repo 'main'
#  script_url 'https://get.docker.com/'
#  action :create
#end

#================ RUN DOCKER IMAGE SECTION ==================
#test docker image:
#docker_image docker_image_name do
#        tag 'v3'----set dynamic versiob
#        action :pull
#end

#optionally add tag after docker image name
#docker_container docker_image_name do
#        detach true
#        port '888:5000'
#        container_name 'web'
#        #image_name:
#        repo 'docker_image_name
#        tag 'v3’----set dynamic versiob
#end

#================ CREATE DOCKER FILE ==================
#directory mvc_demos_path do
#  owner 'root'
#  group 'root'
#  mode '0755'
#  action :create
#  recursive true
#end

docker_contents = "FROM microsoft/aspnet:1.0.0-rc1-final-coreclr" + new_line +
	new_line +
	"COPY project.json /app/" + new_line +
	"WORKDIR /app" + new_line +
	'RUN ["dnu", "restore"]' + new_line +
	"COPY . /app" + new_line +
	"RUN apt-get update && apt-get install -y \\" + new_line +
	tab + "sqlite3 libsqlite3-dev" + new_line +
	new_line +
	"EXPOSE 5000" + new_line +
	'ENTRYPOINT ["dnx", "-p", "project.json", "kestrel"]'

#======FOR TEST PURPOSS ONLY - IMAGE WITH ENTRYPOINT ONLY
	docker_contents = "FROM microsoft/aspnet:1.0.0-rc1-final-coreclr" + new_line + "ENTRYPOINT echo"
#======

#file mvc_demos_path + 'Dockerfile' do
#  content docker_contents
#  owner 'root'
#  group 'root'
#  mode '0755'
#end

#================ TODO: GET VERSION ==================
#apply to projec.json
#apply to image tag
#VERSION IS HARDCODED FOR TEST PURPOSES:
#version = "2016.1.112"

#================ BUILD DOCKER IMAGE ==================

#docker_image docker_image_name do
#       tag version
#	force true
#	source mvc_demos_path + 'Dockerfile'
#       action :build
#end

#================ LOGIN TO DOCKER HUB ==================
#=========DOES NOT WORK
#docker_registry 'https://index.docker.io/v1/' do
#  username 'telerik'
#========== store in databag ============
#  password 'kendorullz'
#  email 'kendouiteam@telerik.com'
#end

#======== WORKAROUND:
#execute 'docker-login' do
#  command 'docker login --email="kendouiteam@telerik.com" --username="telerik" --password="kendorullz"'
#  action :run
#end

#================ PUSH DOCKER IMAGE ==================
#========DOES NOT WORK
#docker_image docker_image_name do
#	repo docker_image_name
#	tag version
#  	action :push
#end

#======== WORKAROUND:
#execute 'docker-push-image' do
#  command 'docker push ' + docker_image_name
#  action :run
#end

#=========DEBUG
#version =
#=========

#================ LOGOUT OF DOCKER HUB ==================
#======== WORKAROUND:
#execute 'docker-logout' do
#  command 'docker logout'
#  action :run
#end


