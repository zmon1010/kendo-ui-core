case node["platform"]
when "windows"
    windows_package "Node.js" do
        source "http://nodejs.org/dist/v0.10.13/node-v0.10.13-x86.msi"
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
