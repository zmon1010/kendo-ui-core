MVC_SRC_ROOT = 'wrappers/mvc/src/'
MVC_BIN_ROOT = MVC_SRC_ROOT + 'Kendo.Mvc/bin/'
MVC_DEMOS_ROOT = 'wrappers/mvc/demos/Kendo.Mvc.Examples/'
DEMO_SHARED_ROOT = 'demos/mvc/content/'

# The list of files which Kendo.Mvc.dll depends on
MVC_WRAPPERS_SRC = FileList[MVC_SRC_ROOT + '**/*.cs']
            .include(MVC_SRC_ROOT + '**/*.resx')
            .include(MVC_SRC_ROOT + '**/*.csproj')
            .include(MVC_SRC_ROOT + '**/*.snk')
            .include(MVC_SRC_ROOT + '**/*.dll')
            .exclude(MVC_SRC_ROOT + '**/Kendo*.dll')

def resources_for(configuration)
    FileList[MVC_SRC_ROOT + 'Kendo.Mvc/Resources/Messages.*.resx']
            .pathmap(MVC_SRC_ROOT + "Kendo.Mvc/bin/#{configuration}/%f")
            .sub(/Messages\.(.+).resx/, '\1/Kendo.Mvc.resources.dll')
end

def dll_for(configuration)
    FileList['Kendo.Mvc.dll']
            .include('Kendo.Mvc.xml')
            .pathmap(MVC_SRC_ROOT + "Kendo.Mvc/bin/#{configuration}/%f")
            .include(resources_for(configuration))
end

# The list of assemblies produced when building the wrappers - Kendo.Mvc.dll and satellite assemblies
MVC3_DLL = dll_for("Release-MVC3")
MVC3_TRIAL_DLL = dll_for("Release-MVC3-Trial")
MVC4_DLL = dll_for("Release")
MVC4_TRIAL_DLL = dll_for("Release-Trial")
MVC5_DLL = dll_for("Release-MVC5")
MVC5_TRIAL_DLL = dll_for("Release-MVC5-Trial")

MVC6_SRC_ROOT = "wrappers/mvc-6/src/Kendo.Mvc/"
MVC6_SOURCES = FileList[MVC6_SRC_ROOT + '**/*.cs']
            .include(MVC6_SRC_ROOT + '**/*.resx')
            .include(MVC6_SRC_ROOT + '**/*.snk')
            .include(MVC6_SRC_ROOT + '**/*.json')

MVC6_REDIST = FileList["Kendo.Mvc.#{VERSION}.nupkg"]
            .include("Kendo.Mvc.#{VERSION}.symbols.nupkg")
            .pathmap(MVC6_SRC_ROOT + "bin/Release/%f")

MVC6_NUGET = "#{MVC6_SRC_ROOT}bin/Release/Kendo.Mvc.#{VERSION}.nupkg"
MVC6_NUGET_SYMBOLS = "#{MVC6_SRC_ROOT}bin/Release/Kendo.Mvc.#{VERSION}.symbols.nupkg"

rule 'Kendo.Mvc.xml' => 'wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll'

# Delete all Kendo*.dll files when `rake clean`
CLEAN.include(FileList['wrappers/mvc/**/Kendo*.dll'])

# Delete all ~/Scripts/**/kendo*.js files when `rake clean`. They are copied by `rake mvc:assets`
CLEAN.include(FileList[MVC_DEMOS_ROOT + 'Scripts/**/*.js'])

# Delete all ~/Content/**/kendo*.css files when `rake clean`. They are copied by `rake mvc:assets`
CLEAN.include(FileList[MVC_DEMOS_ROOT + 'Content/**/kendo*.css'])

MVC_RAZOR_EDITOR_TEMPLATES = FileList[MVC_DEMOS_ROOT + 'Views/Shared/EditorTemplates/*.cshtml']
MVC_ASCX_EDITOR_TEMPLATES = FileList[MVC_DEMOS_ROOT + 'Views/Shared/EditorTemplates/*.ascx']

# The list of whils which Kendo.Mvc.Examples.dll depends on
MVC_DEMOS_SRC = FileList[MVC_DEMOS_ROOT + '**/*.cs']
                .reject { |f| File.directory? f }

# The list of files to deploy in the demos
MVC_DEMOS = FileList[MVC_DEMOS_ROOT + '**/*']
                .include(FileList[MVC_MIN_JS]
                    .sub(DIST_JS_ROOT, MVC_DEMOS_ROOT + 'Scripts')
                )
                .include(FileList[MIN_CSS_RESOURCES]
                    .sub('dist/styles', MVC_DEMOS_ROOT + 'Content')
                )
                .include(FileList[DEMO_SHARED_ROOT + 'shared/js/**/*']
                    .reject { |f| File.directory? f }
                    .sub(DEMO_SHARED_ROOT + 'shared/js', MVC_DEMOS_ROOT + 'Scripts')
                )
                .include(
                    FileList[DEMO_SHARED_ROOT + '{web,dataviz,mobile}/**/*']
                        .reject { |f| File.directory? f }
                        .sub(DEMO_SHARED_ROOT, MVC_DEMOS_ROOT + 'Content/')
                )
                .include(
                    FileList[DEMO_SHARED_ROOT + 'shared/styles/**/*']
                        .reject { |f| File.directory? f }
                        .sub(DEMO_SHARED_ROOT + 'shared/styles', MVC_DEMOS_ROOT + 'Content/shared')
                )
                .include(
                    FileList[DEMO_SHARED_ROOT + 'shared/icons/**/*']
                        .reject { |f| File.directory? f }
                        .sub(DEMO_SHARED_ROOT + 'shared/icons', MVC_DEMOS_ROOT + 'Content/shared/icons')
                )
                .include(
                    FileList[DEMO_SHARED_ROOT + 'shared/images/{patterns,photos,employees}/*']
                        .reject { |f| File.directory? f }
                        .sub(DEMO_SHARED_ROOT + 'shared/images', MVC_DEMOS_ROOT + 'Content/shared/images')
                )
                .include(
                    FileList[DEMO_SHARED_ROOT + 'shared/images/photos/220/*']
                        .reject { |f| File.directory? f }
                        .sub(DEMO_SHARED_ROOT + 'shared/images/photos/220', MVC_DEMOS_ROOT + 'Content/shared/images/photos/220')
                )
                .include(
                    FileList['demos/mvc/content/nav.json', 'demos/mvc/content/mobile-nav.json']
                        .sub('demos/mvc/content', MVC_DEMOS_ROOT + 'Content')
                )
                .include(MVC_DEMOS_ROOT + 'bin/Kendo.Mvc.Examples.dll')
                .exclude('**/*.winjs.*')
                .exclude('**/System*.dll')
                .exclude('**/*.csproj')
                .exclude('**/*resources.dll')
                .exclude('**/Kendo.Mvc.dll')
                .exclude('**/obj/**/*')
                .exclude('**/*.pdb')
                .exclude('**/*.mdb')

# Updates assembly version if the VERSION constant is changed
class AssemblyInfoTask < Rake::FileTask
    def execute(args=nil)
        assemblyInfo = File.read(name)

        assemblyInfo.gsub!(/Version\("(\d+\.){3}(\d+)"\)/,  "Version(\"#{VERSION}.\\2\")")
        assemblyInfo.gsub!(/2012-\d{4}/, "2012-#{Date.today.year}")

        puts "Updating assembly version to #{VERSION}"

        File.open(name, 'w') do |file|
            file.write assemblyInfo
        end
    end

    def needed?
        super || !File.read(name).include?(VERSION)
    end
end

def assembly_info_file (*args, &block)
    AssemblyInfoTask.define_task(*args, &block)
end

# Update CommonAssemblyInfo.cs whenever the VERSION constant changes
assembly_info_file 'wrappers/mvc/src/shared/CommonAssemblyInfo.cs'

# Updates project.json with the VERSION constant
class ProjectFileTask < Rake::FileTask
    def execute(args=nil)
        content = File.read(name)

        content.gsub!(/"version": ".*"/, '"version": "' + VERSION + '"')

        puts "Updating project version to #{VERSION}"

        File.open(name, 'w') do |file|
            file.write content
        end
    end

    def needed?
        super || !File.read(name).include?(VERSION)
    end
end

def project_file (*args, &block)
    ProjectFileTask.define_task(*args, &block)
end

# Update project.json whenever the VERSION constant changes
project_file MVC6_SRC_ROOT + 'project.json'

namespace :mvc do
    tree :to => MVC_DEMOS_ROOT + 'Content',
         :from => MIN_CSS_RESOURCES,
         :root => 'dist/styles'

    tree :to => MVC_DEMOS_ROOT + 'Content',
         :from => 'demos/mvc/content/nav.json',
         :root => 'demos/mvc/content/'

    tree :to => MVC_DEMOS_ROOT + 'Content',
         :from => 'demos/mvc/content/mobile-nav.json',
         :root => 'demos/mvc/content/'

    tree :to => MVC_DEMOS_ROOT + 'Content/web',
         :from => DEMO_SHARED_ROOT + 'web/**/*',
         :root => DEMO_SHARED_ROOT + 'web/'

    tree :to => MVC_DEMOS_ROOT + 'Content/dataviz',
         :from => DEMO_SHARED_ROOT + 'dataviz/**/*',
         :root => DEMO_SHARED_ROOT + 'dataviz/'

    tree :to => MVC_DEMOS_ROOT + 'Content/mobile',
         :from => DEMO_SHARED_ROOT + 'mobile/**/*',
         :root => DEMO_SHARED_ROOT + 'mobile/'

    tree :to => MVC_DEMOS_ROOT + 'Content/shared',
         :from => DEMO_SHARED_ROOT + 'shared/styles/**/*',
         :root => DEMO_SHARED_ROOT + 'shared/styles/'

    tree :to => MVC_DEMOS_ROOT + 'Content/shared/icons',
         :from => DEMO_SHARED_ROOT + 'shared/icons/**/*',
         :root => DEMO_SHARED_ROOT + 'shared/icons/'

    tree :to => MVC_DEMOS_ROOT + 'Content/shared/images',
         :from => DEMO_SHARED_ROOT + 'shared/images/patterns/*',
         :root => DEMO_SHARED_ROOT + 'shared/images/'

    tree :to => MVC_DEMOS_ROOT + 'Content/shared/images',
         :from => DEMO_SHARED_ROOT + 'shared/images/photos/*',
         :root => DEMO_SHARED_ROOT + 'shared/images/'

    tree :to => MVC_DEMOS_ROOT + 'Content/shared/images/photos',
         :from => DEMO_SHARED_ROOT + 'shared/images/photos/220/*',
         :root => DEMO_SHARED_ROOT + 'shared/images/photos/'

    tree :to => MVC_DEMOS_ROOT + 'Content/shared/images',
         :from => DEMO_SHARED_ROOT + 'shared/images/employees/*',
         :root => DEMO_SHARED_ROOT + 'shared/images/'

    tree :to => MVC_DEMOS_ROOT + 'Scripts',
         :from => MVC_MIN_JS,
         :root => DIST_JS_ROOT

    tree :to => MVC_DEMOS_ROOT + 'Scripts',
         :from => DEMO_SHARED_ROOT + 'shared/js/**/*',
         :root => DEMO_SHARED_ROOT + 'shared/js'

    task :assets_js => [:js, MVC_DEMOS_ROOT + 'Scripts', MVC_DEMOS_ROOT + 'App_Data']

    task :assets_css => [
        :less,
        MVC_DEMOS_ROOT + 'Content',
        MVC_DEMOS_ROOT + 'Content/web',
        MVC_DEMOS_ROOT + 'Content/dataviz',
        MVC_DEMOS_ROOT + 'Content/mobile',
        MVC_DEMOS_ROOT + 'Content/shared',
        MVC_DEMOS_ROOT + 'Content/shared/icons',
        MVC_DEMOS_ROOT + 'Content/shared/images',
        MVC_DEMOS_ROOT + 'Content/shared/images/photos'
    ]

    desc('Update CommonAssemblyInfo.cs with current VERSION')
    task :assembly_version => FileList['wrappers/mvc/src/shared/CommonAssemblyInfo.cs',
                                       MVC6_SRC_ROOT + 'project.json']

    desc('Copy the minified CSS and JavaScript to Content and Scripts folder')
    task :assets => ['mvc:assets_js', 'mvc:assets_css', 'mvc_6:assets']

    desc('Build ASP.NET MVC binaries')
    task :binaries => [
        MVC_BIN_ROOT + 'Release/Kendo.Mvc.dll',
        MVC_BIN_ROOT + 'Release-MVC3/Kendo.Mvc.dll',
        MVC_BIN_ROOT + 'Release-MVC5/Kendo.Mvc.dll',
        MVC_BIN_ROOT + 'Release-Trial/Kendo.Mvc.dll',
        MVC_BIN_ROOT + 'Release-MVC3-Trial/Kendo.Mvc.dll',
        MVC_BIN_ROOT + 'Release-MVC5-Trial/Kendo.Mvc.dll',
        MVC_DEMOS_ROOT + 'bin/Kendo.Mvc.Examples.dll',
        MVC6_NUGET,
        MVC6_NUGET_SYMBOLS,
        'dist/binaries/',
        'dist/binaries/mvc-6/'
    ]

    desc('Replace commercial binaries with trials')
    task :copy_trials => ['mvc:binaries'] do
        # replaces commercial assemblies with trial ones in dist/
        [ 'aspnetmvc.hotfix.trial', 'aspnetmvc.trial' ].each do |bundle|
            {
                'Release-Trial' => 'Mvc4',
                'Release-MVC3-Trial' => 'Mvc3',
                'Release-MVC5-Trial' => 'Mvc5'
            }.each do |dir, version|
                src = MVC_BIN_ROOT + dir + '/Kendo.*.dll'
                dest = "dist/bundles/#{bundle}/wrappers/aspnetmvc/Binaries/#{version}/"
                mkdir_p dest
                Dir.glob(src).each { |f| cp f, dest }
            end
        end

        {
            'Release-Trial' => 'VS2012',
            'Release-MVC5-Trial' => 'VS2013'
        }.each do |dir, vs|
            src = MVC_BIN_ROOT + dir + '/Kendo.*.dll'
            dest = "dist/bundles/aspnetmvc.trial/wrappers/aspnetmvc/Examples/#{vs}/Kendo.Mvc.Examples/bin/"
            mkdir_p dest
            Dir.glob(src).each { |f| cp f, dest }
        end
    end
end

# the USE_MONO flag is useful when debugging builds on linux w/o having binaries
if PLATFORM =~ /linux|darwin/ && !ENV['USE_MONO']
    # copy pre-built binaries

    FileList[
        MVC3_DLL + MVC4_DLL + MVC5_DLL +
        MVC3_TRIAL_DLL + MVC4_TRIAL_DLL + MVC5_TRIAL_DLL +
        FileList[MVC_DEMOS_ROOT + 'bin/Kendo.Mvc.Examples.dll']
    ].each do |file|
        file_copy :to => file, :from => file.sub('wrappers/mvc', "dist/binaries")
    end

    MVC6_REDIST.each do |file|
        file_copy :to => file, :from => file.sub(MVC6_SRC_ROOT + "bin/Release", "dist/binaries/mvc-6")
    end

else
    [
        "Release", "Release-MVC3", "Release-MVC5",
        "Release-Trial", "Release-MVC3-Trial", "Release-MVC5-Trial"
    ].each do |configuration|
        options = '/p:Configuration="' + configuration + '"'

        output_dir = "wrappers/mvc/src/Kendo.Mvc/bin/#{configuration}"
        dll_file = "#{output_dir}/Kendo.Mvc.dll"

        # Produce Kendo.Mvc.dll by building Kendo.Mvc.csproj
        file dll_file => MVC_WRAPPERS_SRC do |t|
            msbuild 'wrappers/mvc/src/Kendo.Mvc/Kendo.Mvc.csproj', options

            if PLATFORM =~ /linux|darwin/
                # xbuild can't set the version of satellite assemblies so we build them using `al`
                resources_for(configuration).each do |resource|
                    culture = resource.pathmap("%-1d")
                    obj = "wrappers/mvc/src/Kendo.Mvc/obj/#{configuration}/Kendo.Mvc.Resources.Messages.#{culture}.resources";
                    key = 'wrappers/mvc/src/shared/Kendo.snk'

                    sh "al /t:lib /embed:#{obj} /culture:#{culture} /out:#{resource} /template:#{t.name} /keyfile:#{key}", :verbose => VERBOSE
                end
            end
        end

        # XML API documentation
        file "#{output_dir}/Kendo.Mvc.xml" => dll_file

        # Satellite assemblies (<culture>\Kendo.Mvc.resources.dll) depend on Kendo.Mvc.dll
        rule "#{output_dir}/**/*.resources.dll" => dll_file
    end

    # Produce Kendo.Mvc.Examples.dll by building Kendo.Mvc.Examples.csproj
    file MVC_DEMOS_ROOT + 'bin/Kendo.Mvc.Examples.dll' =>
        MVC_DEMOS_SRC.include('wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.dll') do |t|
        msbuild MVC_DEMOS_ROOT + 'Kendo.Mvc.Examples.csproj'
    end


    tree :to => 'dist/binaries/',
         :from => FileList[
             MVC3_DLL + MVC4_DLL + MVC5_DLL +
             MVC3_TRIAL_DLL + MVC4_TRIAL_DLL + MVC5_TRIAL_DLL +
             FileList['wrappers/mvc/**/*.dll']
         ],
         :root => 'wrappers/mvc/'

    # MVC6 package
    file MVC6_NUGET => MVC6_SOURCES do
        sh "cd #{MVC6_SRC_ROOT} && dnu restore && dnu pack --configuration Release"
    end

    file MVC6_NUGET_SYMBOLS => MVC6_NUGET

    tree :to => 'dist/binaries/mvc-6/',
         :from => MVC6_REDIST,
         :root => MVC6_SRC_ROOT + 'bin/Release/'
end

['commercial', 'internal.commercial'].each do |bundle|
    # Copy Source.snk as Kendo.snk (the original Kendo.snk should not be distributed)
    file_copy :to => "dist/bundles/aspnetmvc.#{bundle}/src/Kendo.Mvc/Kendo.Mvc/Kendo.snk",
              :from => 'wrappers/mvc/src/shared/Source.snk'

    # Copy CommonAssemblyInfo.cs because the 'shared' folder is not distributed
    file_copy :to => "dist/bundles/aspnetmvc.#{bundle}/src/Kendo.Mvc/Kendo.Mvc/CommonAssemblyInfo.cs",
              :from => 'wrappers/mvc/src/shared/CommonAssemblyInfo.cs'

    # Copy Kendo.Mvc.csproj (needed for the next task)
    file_copy :to => "dist/bundles/aspnetmvc.#{bundle}/src/Kendo.Mvc/Kendo.Mvc/Kendo.Mvc.csproj",
              :from => 'wrappers/mvc/src/Kendo.Mvc/Kendo.Mvc.csproj'

    # Patch Visual Studio Project - fix paths etc.
    file "dist/bundles/aspnetmvc.#{bundle}/src/Kendo.Mvc/Kendo.Mvc/Kendo.Mvc.csproj" do |t|
        csproj = File.read(t.name)

        csproj.gsub!(/\.\.\\shared\\Kendo\.snk/, 'Kendo.snk')
        csproj.gsub!(/<Content Include=".*?data\.aspnetmvc\.js"(.|\r|\n)*?<\/Content>/, '')
        csproj.gsub!(/<Content Include=".*?combobox\.aspnetmvc\.js"(.|\r|\n)*?<\/Content>/, '')
        csproj.gsub!(/<Content Include=".*?multiselect\.aspnetmvc\.js"(.|\r|\n)*?<\/Content>/, '')
        csproj.gsub!(/<Content Include=".*?validator\.aspnetmvc\.js"(.|\r|\n)*?<\/Content>/, '<Content Include="..\\js\\kendo.aspnetmvc.js"><Link>Scripts\\kendo.aspnetmvc.js</Link></Content>')
        csproj.gsub!('<Link>Kendo.snk</Link>', '')
        csproj.gsub!(/\.\.\\shared\\CommonAssemblyInfo\.cs/, 'CommonAssemblyInfo.cs')
        csproj.gsub!('<Link>CommonAssemblyInfo.cs</Link>', '')
        csproj.gsub!('..\\..\\packages', '..\\packages')

        File.open(t.name, 'w') do |file|
            file.write csproj
        end
    end

    # Copy Kendo.Mvc.sln in the src directory
    file_copy :to => "dist/bundles/aspnetmvc.#{bundle}/src/Kendo.Mvc/Kendo.Mvc.sln",
              :from => 'wrappers/mvc/Kendo.Mvc.sln'

    # Patch the solution - leave only the Kendo.Mvc project

    file "dist/bundles/aspnetmvc.#{bundle}/src/Kendo.Mvc/Kendo.Mvc.sln" do |t|
        patch_solution t
    end
end

def patch_examples_csproj(t, vs)
    csproj = File.read(t.name)

    # remove AfterBuild target
    csproj.sub!(/\s*<Target Name="AfterBuild"((.|\r|\n)*?)\/Target>/, '')

    # remove project reference
    csproj.sub!(/\s*<ProjectReference((.|\r|\n)*?)\/ProjectReference>/, '')

    # add reference to Kendo dll
    csproj.sub!(/(\s*)(<Reference.*?\/>)/i, '\1\2\1<Reference Include="Kendo.Mvc" />')

    # fix the path to the nuget packages
    csproj.gsub!('..\\..\\packages', '..\\packages')

    csproj = upgrade_project_to_vs2013(csproj) if vs == 'VS2013'

    File.write(t.name, csproj)
end

def upgrade_project_to_vs2013(csproj)
    csproj.gsub(/System\.Web\.([^,]*), Version=2\.0\.0\.0/, "System.Web.\\1, Version=3.0.0.0")
          .gsub(/System\.Web\.([^,]*), Version=4\.0\.0\.0/, "System.Web.\\1, Version=5.0.0.0")
          .gsub(/System\.Net\.([^,]*), Version=4\.0\.0\.0/, "System.Web.\\1, Version=5.0.0.0")
          .gsub('Microsoft.AspNet.Razor.2.0.30506.0\lib\net40', 'Microsoft.AspNet.Razor.3.0.0\lib\net45')
          .gsub(/Microsoft\.AspNet\.(.*)4\.0\.30506\.0\\lib\\net40/, 'Microsoft.AspNet.\\15.0.0\lib\net45')
          .gsub(/Microsoft\.AspNet\.(.*)2\.0\.30506\.0\\lib\\net40/, 'Microsoft.AspNet.\\13.0.0\lib\net45')
          .gsub("{E3E379DF-F4C6-4180-9B81-6769533ABE47};", "")

end

def upgrade_web_config_to_mvc5(t)
    xml = File.read(t.name)

    xml = xml.gsub('oldVersion="1.0.0.0-2.0.0.0"', 'oldVersion="1.0.0.0-3.0.0.0"')
             .gsub('oldVersion="1.0.0.0-4.0.0.0"', 'oldVersion="1.0.0.0-5.0.0.0"')
             .gsub('newVersion="2.0.0.0"', 'newVersion="3.0.0.0"')
             .gsub('newVersion="4.0.0.0"', 'newVersion="5.0.0.0"')
             .sub('key="webpages:Version" value="2.0.0.0"', 'key="webpages:Version" value="3.0.0.0"')
             .gsub(', Version=4.0.0.0', ', Version=5.0.0.0')
             .gsub('System.Data.Entity, Version=5.0.0.0', 'System.Data.Entity, Version=4.0.0.0')
             .gsub(', Version=2.0.0.0', ', Version=3.0.0.0')

    xml = xml.sub(/httpRuntime(.*)?Version=5\.0\.0\.0/, "httpRuntime\\1Version=4.0.0.0")

    File.write(t.name, xml)
end

def patch_examples_solution(t, vs)
    sln = File.read(t.name)

    #Remove the Kendo.Mvc project
    sln.sub!(/\s*Project.*?=\s*"Kendo\.Mvc"((.|\r|\n)*?)EndProject/, '')

    #Remove the Kendo.Mvc.Tests project
    sln.sub!(/\s*Project.*?=\s*"Kendo\.Mvc\.Tests"((.|\r|\n)*?)EndProject/, '')

    #Fix the path to Kendo.Mvc.Examples
    sln.sub!('demos\\', '')

    #Remove the MVC3 build configurations
    sln.gsub!(/.*?MVC3.*?$/, '')

    #Remove empty lines
    sln.gsub!(/^$\n/, '')

    sln = upgrade_solution_to_vs2013(sln) if vs == 'VS2013'

    File.write(t.name, sln)
end

def upgrade_solution_to_vs2013(sln)
    sln.sub('# Visual Studio 2012', "# Visual Studio 2013\nVisualStudioVersion = 12.0.21005.1\nMinimumVisualStudioVersion = 10.0.40219.1")
end

def patch_solution t
    sln = File.read(t.name)

    #Remove the Kendo.Mvc.Examples project
    sln.sub!(/\s*Project.*?=\s*"Kendo\.Mvc\.Examples"((.|\r|\n)*?)EndProject/, '')

    #Remove the Kendo.Mvc.Tests project
    sln.sub!(/\s*Project.*?=\s*"Kendo\.Mvc\.Tests"((.|\r|\n)*?)EndProject/, '')

    #Fix the path to Kendo.Mvc.Examples
    sln.sub!('src\\', '')

    #Remove empty lines
    sln.gsub!(/^$\n/, '')

    File.write(t.name, sln)
end


['commercial', 'trial'].each do |license|

    ['VS2012', 'VS2013'].each do |vs|

        # Copy Kendo.Mvc.sln as Kendo.Mvc.Examples.sln
        file_copy :to => "dist/bundles/aspnetmvc.#{license}/wrappers/aspnetmvc/Examples/#{vs}/Kendo.Mvc.Examples.sln",
                  :from => 'wrappers/mvc/Kendo.Mvc.sln'

        # Copy Kendo.Mvc.Examples.csproj (needed for the next task)
        file_copy :to => "dist/bundles/aspnetmvc.#{license}/wrappers/aspnetmvc/Examples/#{vs}/Kendo.Mvc.Examples/Kendo.Mvc.Examples.csproj",
                  :from => MVC_DEMOS_ROOT + 'Kendo.Mvc.Examples.csproj'

        # Patch the solution - leave only the examples project
        file  "dist/bundles/aspnetmvc.#{license}/wrappers/aspnetmvc/Examples/#{vs}/Kendo.Mvc.Examples.sln" do |t|
            patch_examples_solution(t, vs)
        end

        # Patch Visual Studio Project - fix paths etc.
        file  "dist/bundles/aspnetmvc.#{license}/wrappers/aspnetmvc/Examples/#{vs}/Kendo.Mvc.Examples/Kendo.Mvc.Examples.csproj" do |t|
            patch_examples_csproj(t, vs)
        end

        if vs == 'VS2013'

            ['Web.config', 'Views/Web.config', 'Areas/aspx/Views/Web.config', 'Areas/razor/Views/Web.config'].each do |config|

                file_copy :to => "dist/bundles/aspnetmvc.#{license}/wrappers/aspnetmvc/Examples/#{vs}/Kendo.Mvc.Examples/#{config}",
                          :from => "wrappers/mvc/demos/Kendo.Mvc.Examples/#{config}"

                file "dist/bundles/aspnetmvc.#{license}/wrappers/aspnetmvc/Examples/#{vs}/Kendo.Mvc.Examples/#{config}" do |t|
                    upgrade_web_config_to_mvc5(t)
                end

            end

        end

    end

end
