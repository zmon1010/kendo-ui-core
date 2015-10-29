case node["platform"]
when "windows"
    windows_package "Node.js" do
        source "https://nodejs.org/dist/v4.2.1/node-v4.2.1-x64.msi"
        action :install
    end
else
    # https://github.com/nodesource/distributions#deb
    bash "Run the nodesource magic" do
        code "curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -"
    end

# outdated
# See
# https://github.com/joyent/node/wiki/installing-node.js-via-package-manager
=begin
    apt_repository "node" do
        uri "https://deb.nodesource.com/node"
        key 'nodesource.gpg.key'
        distribution node['lsb']['codename']
        components ["main"]
    end
=end

    package "nodejs" do
        action :upgrade
    end
end
