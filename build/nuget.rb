require 'erb'

NUGETS = [];
NUGET_ZIPS = FileList["dist/bundles/professional.nupkg.zip", "dist/bundles/trial.nupkg.zip", "dist/bundles/aspnetmvc.professional.nupkg.zip", "dist/bundles/aspnetmvc.trial.nupkg.zip"]
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

    file "dist/bundles/professional.nupkg.zip" do |t|
        sh "cd dist/bundles && zip professional.nupkg.zip KendoUIProfessional.#{VERSION}.nupkg"
    end

    file "dist/bundles/trial.nupkg.zip" do |t|
        sh "cd dist/bundles && zip trial.nupkg.zip KendoUIProfessional.Trial.#{VERSION}.nupkg"
    end

    file "dist/bundles/aspnetmvc.professional.nupkg.zip" do |t|
        sh "cd dist/bundles && zip aspnetmvc.commercial.nupkg.zip Telerik.UI.for.AspNet.Mvc3.#{VERSION}.nupkg Telerik.UI.for.AspNet.Mvc4.#{VERSION}.nupkg Telerik.UI.for.AspNet.Mvc5.#{VERSION}.nupkg"
    end

    file "dist/bundles/aspnetmvc.trial.nupkg.zip" do |t|
        sh "cd dist/bundles && zip aspnetmvc.trial.nupkg.zip Telerik.UI.for.AspNet.Mvc3.Trial.#{VERSION}.nupkg Telerik.UI.for.AspNet.Mvc4.Trial.#{VERSION}.nupkg Telerik.UI.for.AspNet.Mvc5.Trial.#{VERSION}.nupkg"
    end
end
