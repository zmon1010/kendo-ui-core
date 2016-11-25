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

        ['Release', 'Release-Trial'].each do |build|
            mkdir_p "#{dest}/#{build}"
            files = Dir.glob("#{src}/#{build}/*.{dll,xml}")
            cp files, "#{dest}/#{build}", :verbose => VERBOSE 
        end

        cp Dir.glob("#{dest}/Release/*.dll"), demos_dest, :verbose => VERBOSE
    end
end
