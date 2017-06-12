VS_SCAFFOLD_SRC_ROOT = 'plugins/KendoScaffolder/'
VS_SCAFFOLD_SRC = FileList[VS_SCAFFOLD_SRC_ROOT + '**/*.*']
                    .exclude('**/KendoScaffolderExtension.vsix')

VS_SCAFFOLD_PROJECT = VS_SCAFFOLD_SRC_ROOT + 'KendoScaffolder.sln'
VS_SCAFFOLD_OUTPUT = VS_SCAFFOLD_SRC_ROOT + 'KendoScaffolderExtension/bin/Release/KendoScaffolderExtension.vsix'
VS_SCAFFOLD_MANIFEST = VS_SCAFFOLD_SRC_ROOT + 'KendoScaffolder/KendoScaffolderExtension/source.extension.vsixmanifest'
VS_SCAFFOLD_MANIFEST_TEMPLATE = VS_SCAFFOLD_MANIFEST + '.template'

CLEAN.include(VS_SCAFFOLD_OUTPUT)

namespace :vs_scaffold do
    desc 'Build the Scaffold manifest'
    task VS_SCAFFOLD_MANIFEST do
        ensure_path VS_SCAFFOLD_MANIFEST

        File.open(VS_SCAFFOLD_MANIFEST_TEMPLATE, 'r:bom|utf-8') do |source|
            contents = source.read

            File.open(VS_SCAFFOLD_MANIFEST, "w") do |file|
                contents.sub!("$SCAFFOLD_VERSION", VERSION)
                file.write(contents)
            end
        end
    end

    file VS_SCAFFOLD_OUTPUT => VS_SCAFFOLD_SRC do |t|
        sh "cd #{VS_SCAFFOLD_SRC_ROOT} && ..\\..\\build\\nuget\\nuget.exe restore"
        system('"C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Professional\\MSBuild\\15.0\\Bin\\MSBuild.exe" plugins\\KendoScaffolder\\KendoScaffolder.sln /p:Configuration=Release')
    end

    desc 'Builds the VS Scaffolder extension'
    task :build => [VS_SCAFFOLD_MANIFEST, VS_SCAFFOLD_OUTPUT]

    file "plugins/KendoScaffolder/KendoScaffolderExtension.vsix" => "dist/binaries/scaffolding/KendoScaffolderExtension.vsix" do |t|
       cp t.prerequisites.first, t.name
    end 
end
