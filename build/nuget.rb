require 'erb'

NUGETS = [];
NUGET_ZIPS = FileList["dist/bundles/telerik.kendoui.professional.#{VERSION}.commercial.nupkg.zip", "dist/bundles/telerik.kendoui.professional.#{VERSION}.trial.nupkg.zip", "dist/bundles/telerik.ui.for.aspnetmvc.#{VERSION}.commercial.nupkg.zip", "dist/bundles/telerik.ui.for.aspnetmvc.#{VERSION}.trial.nupkg.zip"]
namespace :nuget do
    tree :to => "dist/bundles/nuspec",
        :from => "build/nuspec/Mvc*/*.xdt",
        :root => "build/nuspec"

    task :default => "dist/bundles/nuspec"

    FileList['build/nuspec/*.nuspec.erb'].each do |erb|
        nuspec = erb.pathmap('dist/bundles/%n')
        nuget = nuspec.ext('nupkg')

        file nuspec do |f|
            ensure_path f.name
            File.write(f.name, ERB.new(File.read(erb), 0, '%<>').result(binding))
        end

        file nuget => nuspec do |f|
            sh "cd dist/bundles && nuget pack #{nuspec.pathmap("%f")}"
        end

        NUGETS << nuget

        task :default => nuget
    end

    file NUGET_ZIPS[0] do |t|
        sh "cd dist/bundles && zip #{t.name.pathmap('%f')} KendoUIProfessional.#{VERSION}.nupkg"
    end

    file NUGET_ZIPS[1] do |t|
        sh "cd dist/bundles && zip #{t.name.pathmap('%f')} KendoUIProfessional.Trial.#{VERSION}.nupkg"
    end

    file NUGET_ZIPS[2] do |t|
        sh "cd dist/bundles && zip #{t.name.pathmap('%f')} Telerik.UI.for.AspNet.Mvc3.#{VERSION}.nupkg Telerik.UI.for.AspNet.Mvc4.#{VERSION}.nupkg Telerik.UI.for.AspNet.Mvc5.#{VERSION}.nupkg"
    end

    file NUGET_ZIPS[3] do |t|
        sh "cd dist/bundles && zip #{t.name.pathmap('%f')} Telerik.UI.for.AspNet.Mvc3.Trial.#{VERSION}.nupkg Telerik.UI.for.AspNet.Mvc4.Trial.#{VERSION}.nupkg Telerik.UI.for.AspNet.Mvc5.Trial.#{VERSION}.nupkg"
    end
end
