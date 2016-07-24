package "nodejs" do
    version "4.2.6~dfsg-1ubuntu4"
    action :install
end
package "npm" do
    action :install
end
bash "symlink_to_node" do
    code "ln -fs `which nodejs` /usr/bin/node"
end
