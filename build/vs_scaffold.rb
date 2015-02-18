VS_SCAFFOLD_SRC_ROOT = 'plugins/KendoScaffolder/'
VS_SCAFFOLD_SRC = FileList[VS_SCAFFOLD_SRC_ROOT + '**/*.*']
                    .exclude('**/KendoScaffolderExtension.vsix')

VS_SCAFFOLD_PROJECT = VS_SCAFFOLD_SRC_ROOT + 'KendoScaffolder.sln'
VS_SCAFFOLD_OUTPUT = VS_SCAFFOLD_SRC_ROOT + 'KendoScaffolderExtension/bin/Release/KendoScaffolderExtension.vsix'

CLEAN.include(VS_SCAFFOLD_OUTPUT)

namespace :vs_scaffold do
    file VS_SCAFFOLD_OUTPUT => VS_SCAFFOLD_SRC do |t|
        options = '/p:Configuration=Release /p:VisualStudioVersion=12.0'

        msbuild VS_SCAFFOLD_PROJECT, options
    end

    desc 'Builds the VS Scaffolder extension'
    task :build => VS_SCAFFOLD_OUTPUT

    file "plugins/KendoScaffolder/KendoScaffolderExtension.vsix" => "dist/binaries/scaffolding/KendoScaffolderExtension.vsix" do |t|
       cp t.prerequisites.first, t.name
    end 
end
