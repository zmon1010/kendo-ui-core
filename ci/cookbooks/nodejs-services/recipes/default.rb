bash "install pm2 command-line utility" do
    code "npm install -g pm2"
    action :run
    not_if "which pm2"
end

bash "setup PM2 resurrection on startup" do
    code "env PATH=$PATH:/usr/bin pm2 startup ubuntu -u jenkins"
    action :run
end
