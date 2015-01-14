package "tomcat7"
package "tomcat7-admin"
package "tomcat7-docs"
package "tomcat7-examples"

ENV['CATALINA_HOME'] = "/var/lib/tomcat7"

link "/usr/share/tomcat7/conf" do
  to "/var/lib/tomcat7/conf"
end

directory "/etc/tomcat7" do
    mode "0777"
end

link "/usr/share/tomcat7/conf/catalina.policy" do
  to "/etc/tomcat7/policy.d/03catalina.policy"
end

link "/usr/share/tomcat7/log" do
  to "/var/log/tomcat7"
end

service "tomcat7" do
    action [:stop, :disable]
end
