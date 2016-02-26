#
# Cookbook Name:: kendo_docker
# Recipe:: sinopia
#
# Copyright 2016, Telerik AD
#
# All rights reserved - Do Not Redistribute
#

execute 'docker-pull-image' do
  command 'docker pull keyvanfatehi/sinopia:latest'
  action :run
end

cookbook_file "/etc/sinopia.yaml" do
    source "sinopia.yaml"
end

execute 'docker-stop-sinopia' do
  command 'docker stop sinopia'
  only_if 'docker logs sinopia'
  action :run
end

execute 'docker-install-sinopia' do
  command 'docker run --name sinopia -v /etc/sinopia.yaml:/opt/sinopia/config.yaml -d -p 4873:4873 keyvanfatehi/sinopia:latest'
  not_if 'docker logs sinopia'
  action :run
end

execute 'docker-start-sinopia' do
  command 'docker start sinopia'
  action :run
end

