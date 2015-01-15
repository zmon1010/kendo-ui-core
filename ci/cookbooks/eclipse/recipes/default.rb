package 'maven'

src_name = "eclipse-jee-luna.tar.gz"
src_filepath = "#{Chef::Config[:file_cache_path]}/#{src_name}"
extract_root = "/usr/lib"
extract_path = "#{extract_root}/eclipse"

remote_file src_filepath do
  source "http://mirrors.linux-bg.org/eclipse/technology/epp/downloads/release/luna/SR1/eclipse-jee-luna-SR1-linux-gtk-x86_64.tar.gz"
  checksum "8257d8af6c6c01fcb0c542e80b3771348bc0c127"
end

bash 'extract_eclipse' do
  cwd ::File.dirname(src_filepath)
  code <<-EOH
    tar xzf #{src_filepath} -C #{extract_root}
    EOH
  not_if { ::File.exists?(extract_path) }
end

bash 'install m2e' do
  code <<-EOH
    export ECLIPSE_HOME="/usr/lib/eclipse/eclipse"

    /usr/lib/eclipse/eclipse \
    -clean -purgeHistory \
    -application org.eclipse.equinox.p2.director \
    -noSplash \
    -repository \
    http://download.eclipse.org/technology/m2e/releases/ \
    -installIUs \
    org.eclipse.m2e.feature.feature.group \
    -vmargs -Declipse.p2.mirrors=true -Djava.net.preferIPv4Stack=true
    EOH
end

cookbook_file "eclipse" do
    path "/usr/bin/eclipse"
    owner "root"
    group "nogroup"
    mode "0755"
end
