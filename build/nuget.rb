require 'erb'

NUGETS = [];
NUGET_ZIPS = FileList[
    "dist/bundles/telerik.kendoui.professional.#{VERSION}.commercial.nupkg.zip",
    "dist/bundles/telerik.kendoui.professional.#{VERSION}.trial.nupkg.zip",
    "dist/bundles/telerik.ui.for.aspnetmvc.#{VERSION}.commercial.nupkg.zip",
    "dist/bundles/telerik.ui.for.aspnetmvc.#{VERSION}.trial.nupkg.zip"
]
namespace :nuget do
    tree :to => "dist/bundles/nuspec",
        :from => "build/nuspec/Mvc*/*.xdt",
        :root => "build/nuspec"

    file "dist/bundles/mvc-6" do
        sh "ln -s ../binaries/mvc-6 dist/bundles/mvc-6"
    end

    task :default => "dist/bundles/nuspec"

    FileList['build/nuspec/*.nuspec.erb'].each do |erb|
        nuspec = erb.pathmap('dist/bundles/%n')
        nuget = nuspec.ext('nupkg')

        file nuspec => erb do |f|
            ensure_path f.name
            File.write(f.name, ERB.new(File.read(erb), 0, '%<>').result(binding))
        end

        file nuget => [nuspec, "dist/bundles/mvc-6"] do |f|
            sh "cd dist/bundles && nuget pack #{nuspec.pathmap("%f")}"
        end

        NUGETS << nuget

        task :default => nuget
    end

    def zip_bundle(name, package)
        sh "cd dist/bundles && zip #{name.pathmap('%f')} #{package}"
    end

    def mvc_packages(options)
        mvc_versions = [3,4,5,6]

        suffix = ".Trial" if options[:trial]

        mvc_versions.map { |mvc_version|
            version_suffix = MVC_6_VERSION_SUFFIX if mvc_version == 6
            "Telerik.UI.for.AspNet.Mvc#{mvc_version}#{suffix}.#{VERSION}#{version_suffix}.nupkg"
        }.join(" ")
    end

    file NUGET_ZIPS[0] do |t|
        zip_bundle(t.name, "KendoUIProfessional.#{VERSION}.nupkg")
    end

    file NUGET_ZIPS[1] do |t|
        zip_bundle(t.name, "KendoUIProfessional.Trial.#{VERSION}.nupkg")
    end

    file NUGET_ZIPS[2] do |t|
        zip_bundle(t.name, mvc_packages(:trial => false))
    end

    file NUGET_ZIPS[3] do |t|
        zip_bundle(t.name, mvc_packages(:trial => true))
    end
end
