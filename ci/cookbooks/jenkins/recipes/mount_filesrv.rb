package "cifs-utils"

access_options = "username=KendoBuildUser,password=5x1DP2nV3!vB,workgroup=telerik,uid=jenkins"

directory "/mnt/Resources"

mount "/mnt/Resources" do
    device "//filesrvbg01/Resources"
    fstype "cifs"
    options access_options
    pass 0
    action [:mount, :enable]
end

link "/kendo-dist" do
    to "/mnt/Resources/Controls/DISTRIBUTIONS/KendoUI"
end

link "/installers-dist" do
    to "/mnt/Resources/Controls/DISTRIBUTIONS/Guidance/CurrentWebInstaller"
end

directory "/mnt/kendo-iis"

mount "/mnt/kendo-iis" do
    device "//KendoIIS/shares"
    fstype "cifs"
    options access_options
    pass 0
    action [:mount, :enable]
end
