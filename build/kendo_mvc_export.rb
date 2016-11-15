KENDO_MVC_EXPORT_SRC_ROOT = File.join(SPREADSHEET_ROOT, '/Kendo.Mvc.Export/bin')
KENDO_MVC_EXPORT_REDIST_ROOT = ARCHIVE_ROOT + "/Keno.Mvc.Export/"

namespace :kendo_mvc_export do
    desc('Copy Kendo.Mvc.Export binaries')
    task :binaries do
        if PLATFORM =~ /linux|darwin/
            src = KENDO_MVC_EXPORT_REDIST_ROOT
            dest = KENDO_MVC_EXPORT_SRC_ROOT
            {
                'Release' => 'NET40',
                'Release-Trial' => 'NET40-Trial',
            }.each do |build, target|
                mkdir_p "#{dest}/#{target}"
                system "cp -rf #{src}/#{build}/Kendo.Mvc.Export.* #{dest}/#{target}/"
            end
        else
            src = KENDO_MVC_EXPORT_REDIST_ROOT.gsub('/', '\\')
            dest = KENDO_MVC_EXPORT_SRC_ROOT.gsub('/', '\\')
            {
                'Release' => 'NET40',
                'Release-Trial' => 'NET40-Trial',
            }.each do |build, target|
                system "xcopy #{src}\\#{build}\\Kendo.Mvc.Export.* #{dest}\\#{target}\\ /y"
            end
        end
    end
end
