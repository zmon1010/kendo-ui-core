package "cifs-utils"

access_options = "username=KendoBuildUser,password=5x1DP2nV3!vB,workgroup=telerik,uid=jenkins"

directory "/mnt/Distributions"

mount "/mnt/Distributions" do
    device "//filesrvbg01/Distributions"
    fstype "cifs"
    options access_options
    pass 0
    action [:mount, :enable]
end

link "/kendo-dist" do
    to "/mnt/Distributions/DailyBuilds/KendoUI"
end

link "/installers-dist" do
    to "/mnt/Distributions/DailyBuilds/Guidance/WebInstallers/Current/Release"
end

directory "/mnt/kendo-iis"

#mount "/mnt/kendo-iis" do
#    device "//KendoIIS/shares"
#    fstype "cifs"
#    options access_options
#    pass 0
#    action [:mount, :enable]
#end
