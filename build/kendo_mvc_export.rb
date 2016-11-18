KENDO_MVC_EXPORT_SRC_ROOT = File.join(SPREADSHEET_ROOT, '/Kendo.Mvc.Export/bin')
KENDO_MVC_EXPORT_REDIST_ROOT = ARCHIVE_ROOT + '/Keno.Mvc.Export/'
KENDO_MVC_EXPORT_FILES = 'Kendo.Mvc.Export.*'

namespace :kendo_mvc_export do
    desc('Copy Kendo.Mvc.Export binaries')
    task :binaries do
        src = KENDO_MVC_EXPORT_REDIST_ROOT
        dest = KENDO_MVC_EXPORT_SRC_ROOT
        demos_dest = File.join(MVC_DEMOS_ROOT, 'bin/')

        if PLATFORM =~ /linux|darwin/
            {
                'Release' => 'NET40',
                'Release-Trial' => 'NET40-Trial',
            }.each do |build, target|
                mkdir_p "#{dest}/#{target}"
                system "cp -rf #{src}/#{build}/#{KENDO_MVC_EXPORT_FILES} #{dest}/#{target}/"
            end

            system "cp -rf #{dest}/NET40/#{KENDO_MVC_EXPORT_FILES} #{demos_dest}"
        else
            src = src.gsub('/', '\\')
            dest = dest.gsub('/', '\\')
            demos_dest = demos_dest.gsub('/', '\\')

            {
                'Release' => 'NET40',
                'Release-Trial' => 'NET40-Trial',
            }.each do |build, target|
                system "xcopy #{src}\\#{build}\\#{KENDO_MVC_EXPORT_FILES} #{dest}\\#{target}\\ /y"
            end

            system "xcopy #{dest}\\NET40\\#{KENDO_MVC_EXPORT_FILES} #{demos_dest} /y"
        end
    end
end
