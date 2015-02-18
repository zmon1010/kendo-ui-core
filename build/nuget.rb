require 'erb'

NUGETS = [];
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
end
