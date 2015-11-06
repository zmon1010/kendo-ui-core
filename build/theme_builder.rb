require 'erb'

THEME_BUILDER_BUILDFILE = 'build/theme_builder.rb'
THEME_FILES = FileList[
    'styles/web/type-*.less',
    'styles/web/common/*.less',
    'styles/web/themes/*.less'
]
THEME_BUILDER_FILES = [
    'themebuilder/scripts/less.js',
    'themebuilder/scripts/themebuilder.js',
    'themebuilder/scripts/constants.js'
]
TYPE_TEMPLATE_FILE = File.join(File.dirname(__FILE__), 'theme_builder', 'type.js.erb')
TYPE_TEMPLATE = ERB.new(File.read(TYPE_TEMPLATE_FILE), 0, '%<>')

tree :to => 'themebuilder/styles/textures',
     :from => FileList['styles/web/textures/**/*'],
     :root => 'styles/web/textures/'

def less2js(less)
    less.gsub('"', '\\"')
        .gsub(/\n/, "\\n")
        .gsub(/\r/, "")
end

directory "themebuilder/scripts/less/"

THEME_FILES.each do |type|
    name = type.sub('styles/web/', '')
    type_name = name.gsub(/\//, '-').sub('.less', '')
    less_js = "themebuilder/scripts/less/#{type_name}.js"

    file less_js => [
        "themebuilder/scripts/less/",
        type,
        THEME_BUILDER_BUILDFILE,
        TYPE_TEMPLATE_FILE
    ] do |t|
        less = less2js(File.read(type))

        File.write(t.name, TYPE_TEMPLATE.result(binding))
    end

    THEME_BUILDER_FILES.push less_js
end

def live_cdn_version
    '2015.3.930'
end

class PatchedBoostrapScriptTask < Rake::FileTask
    attr_accessor :cdn_root

    include Rake::DSL

    def execute(args=nil)
        ensure_path(name)

        File.open(name, "w") do |file|
            bootstrap = File.read(prerequisites[0])

            {
                "requiredJs" => '["scripts/themebuilder.all.min.js"]',
                "requiredCss" => '["styles/themebuilder.all.min.css"]',
                "bootstrapCss" => '"styles/bootstrap.min.css"',
                "JQUERY_LOCATION" => '"https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"',
                "KENDO_LOCATION" => "\"#{cdn_root}/\""
            }.map { |variable, value|
                bootstrap = replace_variable(bootstrap, variable, value)
            }

            file.write bootstrap
        end

        min_filename = "#{File.basename(name)}.min.js"
        uglifyjs name, min_filename
        mv min_filename, name
    end

    def needed?
        return true if super
        contents = File.read(name)
        !contents.include?(cdn_root)
    end
end

def patched_bootstrap(name, source, cdn_root)
    task = PatchedBoostrapScriptTask.define_task(name => [ source, THEME_BUILDER_BUILDFILE ])
    task.cdn_root = cdn_root
    task
end

def replace_variable(source, name, value)
    source.gsub(/#{name}\s*=\s*.*(,|;)\s*$/, "#{name}=" + value + '\1')
end

file_merge 'themebuilder/scripts/themebuilder.all.js' => THEME_BUILDER_FILES
file 'themebuilder/scripts/themebuilder.all.js' => THEME_BUILDER_BUILDFILE
file 'themebuilder/scripts/themebuilder.all.min.js' => 'themebuilder/scripts/themebuilder.all.js' do
    uglifyjs('themebuilder/scripts/themebuilder.all.js', 'themebuilder/scripts/themebuilder.all.min.js');
end

CLEAN.include('themebuilder/scripts/themebuilder.all*js')
CLEAN.include('themebuilder/scripts/themebuilder.all*css')

file_merge 'themebuilder/styles/themebuilder.all.css' => [
    'themebuilder/styles/styles.css'
]
file 'themebuilder/styles/themebuilder.all.css' => THEME_BUILDER_BUILDFILE

THEME_BUILDER_RESOURCES = FileList['themebuilder/scripts/themebuilder.all.min.js']
                .include('themebuilder/styles/textures/**/*')
                .include('themebuilder/styles/sprite.png')
                .include('themebuilder/styles/bootstrap.min.css')
                .include('themebuilder/styles/themebuilder.all.min.css')
                .include('themebuilder/index.html')
                .include('themebuilder/web.config')

tree :to => 'dist/themebuilder/production',
     :from =>  THEME_BUILDER_RESOURCES,
     :root => 'themebuilder/'

tree :to => 'dist/themebuilder/staging',
     :from =>  THEME_BUILDER_RESOURCES,
     :root => 'themebuilder/'

namespace :themebuilder do

    desc('Build the generated ThemeBuilder sources')
    task :sources => [
        'themebuilder/styles/textures'
    ].concat(THEME_BUILDER_FILES)

    desc('Build the ThemeBuilder for live deployment')
    task :production => [
        'dist/themebuilder/production',
        patched_bootstrap('dist/themebuilder/production/bootstrap.js', 'themebuilder/bootstrap.js', CDN_ROOT + live_cdn_version)
    ]

    desc('Build the ThemeBuilder for staging')
    task :staging => 'dist/themebuilder/staging.zip'

    desc('Deploy the ThemeBuilder to live site')
    task :upload => [ :less, :sources, :production ] do
        def sync(local, remote)
            system("lftp 172.17.49.82:33 -e 'mirror -R -p --delete #{local} #{remote}; bye'")
        end

        dist = 'dist/themebuilder/production'

        sync(dist, 'kendoui-themebuilder.telerik.com')
        sync(dist, 'themebuilder.kendoui.com')
    end

    zip 'dist/themebuilder/staging.zip' => [
        'dist/themebuilder/staging',
        patched_bootstrap('dist/themebuilder/staging/bootstrap.js', 'themebuilder/bootstrap.js', STAGING_CDN_ROOT + CURRENT_COMMIT)
    ]

end
