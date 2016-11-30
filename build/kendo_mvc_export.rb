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

KENDO_MVC_EXPORT_REDIST_ROOT = ARCHIVE_ROOT + '/ExportExtensions'
KENDO_MVC_EXPORT_REDIST_NET40 = mvc_export_dll_for("Release")
KENDO_MVC_EXPORT_REDIST_NET40_TRIAL = mvc_export_dll_for("Release-Trial")

namespace :kendo_mvc_export do
    desc('Copy Kendo.Mvc.Export binaries')
    task :binaries do
        src = KENDO_MVC_EXPORT_REDIST_ROOT
        dest = KENDO_MVC_EXPORT_SRC_ROOT
        dpl = SPREADSHEET_REDIST_ROOT
        dpl_files = FileList[*KENDO_MVC_EXPORT_DPL_FILES]
        demos_dest = File.join(MVC_DEMOS_ROOT, 'bin/')
        dlls = "*.{dll,xml}"

        if PLATFORM =~ /linux|darwin/
            [ 'Release', 'Release-Trial' ].each do |build|
				build_dest = "#{dest}/#{build}"
                dpl_path = File.join(dpl, build)
                dpl_files = dpl_files.pathmap(dpl_path + "/%f")

                mkdir_p build_dest
                cp Dir.glob(File.join(src, dlls)), build_dest, :verbose => VERBOSE
                cp dpl_files, build_dest, :verbose => VERBOSE
            end

            cp Dir.glob(File.join(dest, "Release", dlls)), demos_dest, :verbose => VERBOSE
        else
            src = src.gsub('/', '\\')
            dest = dest.gsub('/', '\\')
			dpl.gsub!('/', '\\')
            demos_dest = demos_dest.gsub('/', '\\')

            [ 'Release', 'Release-Trial' ].each do |build|
                target = "#{dest}\\#{build}\\"
				["dll", "xml"].each do |ext|
                	system "xcopy #{src}\\*.#{ext} #{target} /y"

				end
                KENDO_MVC_EXPORT_DPL_FILES.each do |file|
                    system "xcopy #{dpl}\\#{build}\\#{file} #{target} /y"
                end
            end

			["dll", "xml"].each do |ext|
            	system "xcopy #{dest}\\Release\\*.#{ext} #{demos_dest} /y"
			end
        end
    end
end
