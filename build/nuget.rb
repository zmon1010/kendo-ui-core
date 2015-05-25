require 'erb'

NUGETS = []

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

    MVC6_NUGETS = MVC6_REDIST.pathmap('dist/bundles/%f')
    MVC6_REDIST.each do |nuget|
        file_copy :from => nuget.pathmap('dist/binaries/mvc-6/%f'),
                  :to => nuget.pathmap('dist/bundles/%f')

        NUGETS << nuget.pathmap('%f')
    end

    task :default => ["dist/bundles/nuspec", MVC6_NUGETS].flatten

    FileList['build/nuspec/*.nuspec.erb'].each do |erb|
        nuspec = erb.pathmap('dist/bundles/%n')
        nuget = nuspec.ext('nupkg')

        file nuspec => erb do |f|
            ensure_path f.name
            File.write(f.name, ERB.new(File.read(erb), 0, '%<>').result(binding))
        end

        file nuget => [nuspec] do |f|
            sh "cd dist/bundles && nuget pack #{nuspec.pathmap("%f")}"
        end

        NUGETS << nuget

        task :default => nuget
    end

    def zip_bundle(name, package)
        sh "cd dist/bundles && zip #{name.pathmap('%f')} #{package}"
    end

    def mvc_packages(options)
        mvc_versions = [3,4,5]

        suffix = ".Trial" if options[:trial]

        packages = mvc_versions.map { |mvc_version| "Telerik.UI.for.AspNet.Mvc#{mvc_version}#{suffix}.#{VERSION}.nupkg" }
        packages << "Kendo.Mvc.#{VERSION}.nupkg"
        packages << "Kendo.Mvc.#{VERSION}.symbols.nupkg"

        packages.join(" ")
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
