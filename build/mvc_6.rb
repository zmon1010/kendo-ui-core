MVC_6_DEMOS_WWWROOT = 'wrappers/mvc-6/demos/Kendo.Mvc.Examples/wwwroot/lib/kendo/'

# Delete all ~/Scripts/**/kendo*.js files when `rake clean`. They are copied by `rake mvc:assets`
CLEAN.include(FileList[MVC_6_DEMOS_WWWROOT + 'js/**/*.js'])

# Delete all ~/Content/**/kendo*.css files when `rake clean`. They are copied by `rake mvc:assets`
CLEAN.include(FileList[MVC_6_DEMOS_WWWROOT + 'css/**/kendo*.css'])

namespace :mvc_6 do
    tree :to => MVC_6_DEMOS_WWWROOT + 'css',
         :from => MIN_CSS_RESOURCES,
         :root => 'dist/styles'

    tree :to => MVC_6_DEMOS_WWWROOT + 'shared',
         :from => 'demos/mvc/content/nav.json',
         :root => 'demos/mvc/content/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'css/web',
         :from => DEMO_SHARED_ROOT + 'web/**/*',
         :root => DEMO_SHARED_ROOT + 'web/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'css/dataviz',
         :from => DEMO_SHARED_ROOT + 'dataviz/**/*',
         :root => DEMO_SHARED_ROOT + 'dataviz/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'css/mobile',
         :from => DEMO_SHARED_ROOT + 'mobile/**/*',
         :root => DEMO_SHARED_ROOT + 'mobile/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'css/shared',
         :from => DEMO_SHARED_ROOT + 'shared/styles/**/*',
         :root => DEMO_SHARED_ROOT + 'shared/styles/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'css/shared/icons',
         :from => DEMO_SHARED_ROOT + 'shared/icons/**/*',
         :root => DEMO_SHARED_ROOT + 'shared/icons/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'css/shared/images',
         :from => DEMO_SHARED_ROOT + 'shared/images/patterns/*',
         :root => DEMO_SHARED_ROOT + 'shared/images/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'css/shared/images',
         :from => DEMO_SHARED_ROOT + 'shared/images/photos/*',
         :root => DEMO_SHARED_ROOT + 'shared/images/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'css/shared/images/photos',
         :from => DEMO_SHARED_ROOT + 'shared/images/photos/220/*',
         :root => DEMO_SHARED_ROOT + 'shared/images/photos/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'css/shared/images',
         :from => DEMO_SHARED_ROOT + 'shared/images/employees/*',
         :root => DEMO_SHARED_ROOT + 'shared/images/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'js',
         :from => MVC_MIN_JS,
         :root => DIST_JS_ROOT

    tree :to => MVC_6_DEMOS_WWWROOT + 'js',
         :from => DEMO_SHARED_ROOT + 'shared/js/**/*',
         :root => DEMO_SHARED_ROOT + 'shared/js'

    task :assets_js => [:js, MVC_6_DEMOS_WWWROOT + 'js']

    task :assets_shared => [MVC_6_DEMOS_WWWROOT + 'shared']

    task :assets_css => [
        :less,
        MVC_6_DEMOS_WWWROOT + 'css',
        MVC_6_DEMOS_WWWROOT + 'css/web',
        MVC_6_DEMOS_WWWROOT + 'css/dataviz',
        MVC_6_DEMOS_WWWROOT + 'css/mobile',
        MVC_6_DEMOS_WWWROOT + 'css/shared',
        MVC_6_DEMOS_WWWROOT + 'css/shared/icons',
        MVC_6_DEMOS_WWWROOT + 'css/shared/images',
        MVC_6_DEMOS_WWWROOT + 'css/shared/images/photos'
    ]

    desc('Copy the minified CSS and JavaScript to wwwroot/lib/kendo folder')
    task :assets => ['mvc_6:assets_js', 'mvc_6:assets_css', 'mvc_6:assets_shared']
end
