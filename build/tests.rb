require 'tasks'

TESTS = FileList["tests/**/*"]
DEPS = [FileList["src/**/*.js"], FileList['styles/**/*.*'], KENDO_CONFIG_FILE, TESTS].flatten
JQUERY_VERSION_2 = "2.2.4"
JQUERY_VERSION_3 = "3.1.1"
JSHINT_FILES = FileList[JSON.parse(File.read("package.json"))['jshintFiles']]

scripts_arg =  "--scripts=kendo.{all,aspnetmvc}.js"
styles_arg =  "--styles={web/kendo.common.less,mobile/kendo.mobile.all.less,dataviz/kendo.dataviz.less,web/kendo.rtl.less}"
namespace :tests do
    task :java do
        mvn(POM, 'clean test')
    end

    task :aspnetmvc do
        msbuild "wrappers/mvc/Kendo.Mvc.sln"
        sh "build/xunit/xunit.console.clr4.exe wrappers/mvc/tests/Kendo.Mvc.Tests/bin/Release/Kendo.Mvc.Tests.dll"

        sh "cd wrappers/mvc-6/tests/Kendo.Mvc.Tests && dotnet restore && dotnet test"
    end

    task :spreadsheet => ["spreadsheet:binaries"] do
        msbuild SPREADSHEET_ROOT  + '/Telerik.Web.Spreadsheet.sln', "/p:Configuration=Debug"
        sh "build/xunit-2.0/xunit.console.exe #{SPREADSHEET_ROOT }/Telerik.Web.Spreadsheet.Tests/bin/Debug/Telerik.Web.Spreadsheet.Tests.dll"
    end

    desc "Run tests in jQuery 2"
    task :jquery2 => DEPS do
        gulp_xvfb "ci", "--junit-results=jquery-2-test-results.xml", "--single-run=true", "--jquery=#{JQUERY_VERSION_2}", "--skip-cultures", "--skip-source-maps", scripts_arg, styles_arg
    end

    desc "Run tests in jQuery 3"
    task :jquery3 => DEPS do
        gulp_xvfb "ci", "--junit-results=jquery-3-test-results.xml", "--single-run=true", "--jquery=#{JQUERY_VERSION_3}", "--skip-cultures", "--skip-source-maps", scripts_arg, styles_arg
    end

    desc "Run tests in firefox"
    task :firefox => DEPS do
        gulp_xvfb "ci", "--junit-results=firefox-test-results.xml", "--single-run=true", "--browser=Firefox", "--skip-cultures", "--skip-source-maps", scripts_arg, styles_arg
    end

    desc "Run jshint"
    task :jshint => JSHINT_FILES do
        gulp "jshint"
    end

    %w[CI Production TZ].each do |env|
        desc "Run #{env} tests"
        task env => [:jshint, :java] do
            output = "#{env}-test-results.xml"
            gulp_xvfb "ci", "--junit-results=#{output}", "--single-run=true", "--skip-cultures", "--skip-source-maps", scripts_arg, styles_arg
        end
    end
end
