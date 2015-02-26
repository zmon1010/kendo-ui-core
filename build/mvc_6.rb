MVC_6_DEMOS_WWWROOT = 'wrappers/mvc-6/demos/Kendo.Mvc.Examples/wwwroot/'

# Delete all ~/Scripts/**/kendo*.js files when `rake clean`. They are copied by `rake mvc:assets`
CLEAN.include(FileList[MVC_6_DEMOS_WWWROOT + 'Scripts/**/*.js'])

# Delete all ~/Content/**/kendo*.css files when `rake clean`. They are copied by `rake mvc:assets`
CLEAN.include(FileList[MVC_6_DEMOS_WWWROOT + 'Content/**/kendo*.css'])

namespace :mvc_6 do
    tree :to => MVC_6_DEMOS_WWWROOT + 'Content',
         :from => MIN_CSS_RESOURCES,
         :root => 'dist/styles'

    tree :to => MVC_6_DEMOS_WWWROOT + 'Content',
         :from => 'demos/mvc/content/nav.json',
         :root => 'demos/mvc/content/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'Content/web',
         :from => DEMO_SHARED_ROOT + 'web/**/*',
         :root => DEMO_SHARED_ROOT + 'web/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'Content/dataviz',
         :from => DEMO_SHARED_ROOT + 'dataviz/**/*',
         :root => DEMO_SHARED_ROOT + 'dataviz/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'Content/mobile',
         :from => DEMO_SHARED_ROOT + 'mobile/**/*',
         :root => DEMO_SHARED_ROOT + 'mobile/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'Content/shared',
         :from => DEMO_SHARED_ROOT + 'shared/styles/**/*',
         :root => DEMO_SHARED_ROOT + 'shared/styles/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'Content/shared/icons',
         :from => DEMO_SHARED_ROOT + 'shared/icons/**/*',
         :root => DEMO_SHARED_ROOT + 'shared/icons/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'Content/shared/images',
         :from => DEMO_SHARED_ROOT + 'shared/images/patterns/*',
         :root => DEMO_SHARED_ROOT + 'shared/images/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'Content/shared/images',
         :from => DEMO_SHARED_ROOT + 'shared/images/photos/*',
         :root => DEMO_SHARED_ROOT + 'shared/images/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'Content/shared/images/photos',
         :from => DEMO_SHARED_ROOT + 'shared/images/photos/220/*',
         :root => DEMO_SHARED_ROOT + 'shared/images/photos/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'Content/shared/images',
         :from => DEMO_SHARED_ROOT + 'shared/images/employees/*',
         :root => DEMO_SHARED_ROOT + 'shared/images/'

    tree :to => MVC_6_DEMOS_WWWROOT + 'Scripts',
         :from => MVC_MIN_JS,
         :root => DIST_JS_ROOT

    tree :to => MVC_6_DEMOS_WWWROOT + 'Scripts',
         :from => DEMO_SHARED_ROOT + 'shared/js/**/*',
         :root => DEMO_SHARED_ROOT + 'shared/js'

    task :assets_js => [:js, MVC_6_DEMOS_WWWROOT + 'Scripts']

    task :assets_css => [
        :less,
        MVC_6_DEMOS_WWWROOT + 'Content',
        MVC_6_DEMOS_WWWROOT + 'Content/web',
        MVC_6_DEMOS_WWWROOT + 'Content/dataviz',
        MVC_6_DEMOS_WWWROOT + 'Content/mobile',
        MVC_6_DEMOS_WWWROOT + 'Content/shared',
        MVC_6_DEMOS_WWWROOT + 'Content/shared/icons',
        MVC_6_DEMOS_WWWROOT + 'Content/shared/images',
        MVC_6_DEMOS_WWWROOT + 'Content/shared/images/photos'
    ]

    desc('Copy the minified CSS and JavaScript to Content and Scripts folder')
    task :assets => ['mvc_6:assets_js', 'mvc_6:assets_css']
end
