KENDO_MVC_EXPORT_DPL_FILES = [
    'Telerik.Documents.SpreadsheetStreaming',
    'Telerik.Windows.Documents.Core',
    'Telerik.Windows.Documents.Fixed',
    'Telerik.Windows.Documents.Flow',
    'Telerik.Windows.Documents.Flow.FormatProviders.Pdf',
    'Telerik.Windows.Zip'
].flat_map { |file| ["#{file}.dll", "#{file}.xml"] }

KENDO_MVC_EXPORT_SRC_ROOT = File.join(SPREADSHEET_ROOT, '/Kendo.Mvc.Export/bin')

def mvc_export_dll_for(configuration)
    FileList["Kendo.Mvc.Export.dll", "Kendo.Mvc.Export.xml"]
            .include(KENDO_MVC_EXPORT_DPL_FILES)
            .pathmap(KENDO_MVC_EXPORT_SRC_ROOT + "/#{configuration}/%f")
end

KENDO_MVC_EXPORT_REDIST_ROOT = ARCHIVE_ROOT + '/Kendo.Mvc.Export'
KENDO_MVC_EXPORT_REDIST_NET40 = mvc_export_dll_for("Release")
KENDO_MVC_EXPORT_REDIST_NET40_TRIAL = mvc_export_dll_for("Release-Trial")

namespace :kendo_mvc_export do
    desc('Copy Kendo.Mvc.Export binaries')
    task :binaries do
        src = KENDO_MVC_EXPORT_REDIST_ROOT
        dest = KENDO_MVC_EXPORT_SRC_ROOT
        demos_dest = File.join(MVC_DEMOS_ROOT, 'bin/')

        if PLATFORM =~ /linux|darwin/
            [ 'Release', 'Release-Trial' ].each do |build|
				build_dest = "#{dest}/#{build}"

                mkdir_p build_dest
                system "cp -rf #{src}/#{build}/*.{dll,xml} #{build_dest}"
            end

            system "cp -rf #{dest}/Release/*.{dll,xml} #{demos_dest}"
        else
            src = src.gsub('/', '\\')
            dest = dest.gsub('/', '\\')
            demos_dest = demos_dest.gsub('/', '\\')

            [ 'Release', 'Release-Trial' ].each do |build|
				["dll", "xml"].each do |ext|
                	system "xcopy #{src}\\#{build}\\*.#{ext} #{dest}\\#{build}\\ /y"
				end
            end

			["dll", "xml"].each do |ext|
            	system "xcopy #{dest}\\Release\\*.#{ext} #{demos_dest} /y"
			end
        end
    end
end
