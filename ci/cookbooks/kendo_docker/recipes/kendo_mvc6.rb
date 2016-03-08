#
# Cookbook Name:: kendo_docker
# Recipe:: kendo_mvc6
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

#=========DOES NOT WORK, REQUIRE CHEF12
#docker_installation_script 'default' do
#  repo 'main'
#  script_url 'https://get.docker.com/'
#  action :create
#end

#================ RUN DOCKER IMAGE - OPTIONAL ==================
#=========DOES NOT WORK, REQUIRE CHEF12
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
#IMPORTANT: RESTORE WILL FAIL BEHIND CORPORATE FIREWALL! USE BUILD MACHINES
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
	'ENTRYPOINT ["dnx", "-p", "project.json", "web"]'

#======FOR TEST PURPOSS ONLY - IMAGE WITH ENTRYPOINT ONLY
#	docker_contents = "FROM microsoft/aspnet:1.0.0-rc1-final-coreclr" + new_line + "ENTRYPOINT echo" + KENDO_VERSION
#======

file mvc_demos_path + 'Dockerfile' do
  content docker_contents
  owner 'root'
  group 'root'
  mode '0755'
end

#================ BUILD DOCKER IMAGE ==================
#=========DOES NOT WORK, REQUIRE CHEF12
#docker_image docker_image_name do
#       tag KENDO_VERSION
#	force true
#	source mvc_demos_path + 'Dockerfile'
#       action :build
#end

execute 'docker-build-image' do
  command 'docker build -t ' + docker_image_name + ':' + KENDO_VERSION + ' ' + mvc_demos_path
  action :run
end

#================ LOGIN TO DOCKER HUB ==================
#=========DOES NOT WORK, BUG
#docker_registry 'https://index.docker.io/v1/' do
#  username 'telerik'
#  password 'kendorullz'
#  email 'kendouiteam@telerik.com'
#end

#======== WORKAROUND:
execute 'docker-login' do
  command 'docker login --email="kendouiteam@telerik.com" --username="telerik" --password="kendorullz"'
  action :run
end

#================ PUSH DOCKER IMAGE ==================
#========DOES NOT WORK, BUG
#docker_image docker_image_name do
#	repo docker_image_name
#	tag version
#  	action :push
#end

#======== WORKAROUND:
execute 'docker-push-image' do
  command 'docker push ' + docker_image_name + ':' + KENDO_VERSION
  action :run
end

#================ LOGOUT OF DOCKER HUB ==================
#======== WORKAROUND:
execute 'docker-logout' do
  command 'docker logout'
  action :run
end


