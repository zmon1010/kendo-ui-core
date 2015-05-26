MVC_6_VERSION_SUFFIX = "-beta4"
MVC_6_DEMOS_ROOT = 'wrappers/mvc-6/demos/Kendo.Mvc.Examples/'
MVC_6_DEMOS_WWWROOT = MVC_6_DEMOS_ROOT + 'wwwroot/'
MVC_6_DEMOS_LIBROOT = MVC_6_DEMOS_WWWROOT + 'lib/kendo/'

# Delete all ~/Scripts/**/kendo*.js files when `rake clean`. They are copied by `rake mvc:assets`
CLEAN.include(FileList[MVC_6_DEMOS_LIBROOT + 'js/**/*.js'])

# Delete all ~/Content/**/kendo*.css files when `rake clean`. They are copied by `rake mvc:assets`
CLEAN.include(FileList[MVC_6_DEMOS_LIBROOT + 'css/**/kendo*.css'])

# The list of files to deploy in the demos
MVC_6_DEMOS = FileList[MVC_6_DEMOS_ROOT + '**/*']
                .include(FileList[MVC_MIN_JS]
                    .sub(DIST_JS_ROOT, MVC_6_DEMOS_LIBROOT + 'js')
                )
                .include(FileList[MIN_CSS_RESOURCES]
                    .sub('dist/styles', MVC_6_DEMOS_LIBROOT + 'css')
                )
                .include(FileList[DEMO_SHARED_ROOT + 'shared/js/**/*']
                    .reject { |f| File.directory? f }
                    .sub(DEMO_SHARED_ROOT + 'shared/js', MVC_6_DEMOS_WWWROOT + 'shared')
                )
                .include(
                    FileList[DEMO_SHARED_ROOT + '{web,dataviz,mobile}/**/*']
                        .reject { |f| File.directory? f }
                        .sub(DEMO_SHARED_ROOT, MVC_6_DEMOS_WWWROOT + 'shared/')
                )
                .include(
                    FileList[DEMO_SHARED_ROOT + 'shared/styles/**/*']
                        .reject { |f| File.directory? f }
                        .sub(DEMO_SHARED_ROOT + 'shared/styles', MVC_6_DEMOS_WWWROOT + 'shared')
                )
                .include(
                    FileList[DEMO_SHARED_ROOT + 'shared/icons/**/*']
                        .reject { |f| File.directory? f }
                        .sub(DEMO_SHARED_ROOT + 'shared/icons', MVC_6_DEMOS_WWWROOT + 'shared/icons')
                )
                .include(
                    FileList[DEMO_SHARED_ROOT + 'shared/images/{patterns,photos,employees}/*']
                        .reject { |f| File.directory? f }
                        .sub(DEMO_SHARED_ROOT + 'shared/images', MVC_6_DEMOS_WWWROOT + 'shared/images')
                )
                .include(
                    FileList[DEMO_SHARED_ROOT + 'shared/images/photos/220/*']
                        .reject { |f| File.directory? f }
                        .sub(DEMO_SHARED_ROOT + 'shared/images/photos/220', MVC_6_DEMOS_WWWROOT + 'shared/images/photos/220')
                )
                .include(
                    FileList['demos/mvc/content/nav.json']
                        .sub('demos/mvc/content', MVC_6_DEMOS_WWWROOT + 'shared')
                )

def update_nuget_reference name
    return unless File.exists? name

    content = File.read(name)
    content.gsub!(/"Kendo.Mvc": ".*"/, '"Kendo.Mvc": "' + VERSION + '"')

    puts "Updating examples NuGet reference to #{VERSION}"

    File.open(name, 'w') do |file|
        file.write content
    end
end

namespace :mvc_6 do
    tree :to => MVC_6_DEMOS_LIBROOT + 'css',
         :from => MIN_CSS_RESOURCES,
         :root => 'dist/styles'

    tree :to => MVC_6_DEMOS_WWWROOT + 'shared',
         :from => 'demos/mvc/content/nav.json',
         :root => 'demos/mvc/content/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'shared/web',
         :from => DEMO_SHARED_ROOT + 'web/**/*',
         :root => DEMO_SHARED_ROOT + 'web/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'shared/dataviz',
         :from => DEMO_SHARED_ROOT + 'dataviz/**/*',
         :root => DEMO_SHARED_ROOT + 'dataviz/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'shared/mobile',
         :from => DEMO_SHARED_ROOT + 'mobile/**/*',
         :root => DEMO_SHARED_ROOT + 'mobile/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'shared',
         :from => DEMO_SHARED_ROOT + 'shared/styles/**/*',
         :root => DEMO_SHARED_ROOT + 'shared/styles/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'shared/icons',
         :from => DEMO_SHARED_ROOT + 'shared/icons/**/*',
         :root => DEMO_SHARED_ROOT + 'shared/icons/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'shared/images',
         :from => DEMO_SHARED_ROOT + 'shared/images/patterns/*',
         :root => DEMO_SHARED_ROOT + 'shared/images/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'shared/images',
         :from => DEMO_SHARED_ROOT + 'shared/images/photos/*',
         :root => DEMO_SHARED_ROOT + 'shared/images/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'shared/images/photos',
         :from => DEMO_SHARED_ROOT + 'shared/images/photos/220/*',
         :root => DEMO_SHARED_ROOT + 'shared/images/photos/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'shared/images',
         :from => DEMO_SHARED_ROOT + 'shared/images/employees/*',
         :root => DEMO_SHARED_ROOT + 'shared/images/'

    tree :to => MVC_6_DEMOS_LIBROOT + 'js',
         :from => MVC_MIN_JS,
         :root => DIST_JS_ROOT

    tree :to => MVC_6_DEMOS_WWWROOT + 'shared',
         :from => DEMO_SHARED_ROOT + 'shared/js/**/*',
         :root => DEMO_SHARED_ROOT + 'shared/js'

    task :assets_js => [:js, MVC_6_DEMOS_LIBROOT + 'js']

    task :assets_shared => [MVC_6_DEMOS_WWWROOT + 'shared']

    task :assets_css => [
        :less,
        MVC_6_DEMOS_LIBROOT + 'css',
        MVC_6_DEMOS_WWWROOT + 'shared',
        MVC_6_DEMOS_WWWROOT + 'shared/web',
        MVC_6_DEMOS_WWWROOT + 'shared/dataviz',
        MVC_6_DEMOS_WWWROOT + 'shared/mobile',
        MVC_6_DEMOS_WWWROOT + 'shared/icons',
        MVC_6_DEMOS_WWWROOT + 'shared/images',
        MVC_6_DEMOS_WWWROOT + 'shared/images/photos'
    ]

    desc('Copy the minified CSS and JavaScript to wwwroot/lib/kendo folder')
    task :assets => ['mvc_6:assets_js', 'mvc_6:assets_css', 'mvc_6:assets_shared']

    desc('Copy NuGet packages to offline demos')
    task :update_demo_deps do
        [ 'aspnetmvc.trial', 'aspnetmvc.commercial' ].each do |bundle|
            root = "dist/bundles/#{bundle}/wrappers/aspnetmvc/Examples/VS2015/"

            mkdir_p root
            cp 'wrappers/mvc-6/NuGet.config', root

            update_nuget_reference "#{root}/Kendo.Mvc.Examples/project.json"
        end
    end
end
