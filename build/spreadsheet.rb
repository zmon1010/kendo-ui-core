DPL_DIST = "\\\\telerik.com\\distributions\\DailyBuilds\\XAML\\Release\\Binaries"
DPL_FILES = [
    'Telerik.Windows.Documents.Core',
    'Telerik.Windows.Documents.Fixed',
    'Telerik.Windows.Documents.Flow',
    'Telerik.Windows.Documents.Flow.FormatProviders.Pdf',
    'Telerik.Windows.Documents.Spreadsheet',
    'Telerik.Windows.Documents.Spreadsheet.FormatProviders.OpenXml',
    'Telerik.Windows.Documents.Spreadsheet.FormatProviders.Pdf',
    'Telerik.Windows.Maths',
    'Telerik.Windows.Zip'
].flat_map { |file| ["#{file}.dll", "#{file}.xml"] }

SPREADSHEET_ROOT = 'dpl'
SPREADSHEET_SRC_ROOT = SPREADSHEET_ROOT + '/Telerik.Web.Spreadsheet'
def spreadsheet_dll_for(configuration)
    FileList['Telerik.Web.Spreadsheet.dll']
            .include('Telerik.Web.Spreadsheet.xml')
            .include('Newtonsoft.Json.xml')
            .include('Newtonsoft.Json.dll')
            .include(DPL_FILES)
            .include('Telerik.Web.Spreadsheet.dll')
            .pathmap(SPREADSHEET_SRC_ROOT + "/bin/#{configuration}/%f")
end

SPREADSHEET_REDIST_NET40 = spreadsheet_dll_for('Release')
SPREADSHEET_REDIST_NET45 = spreadsheet_dll_for('Release-NET45')
SPREADSHEET_REDIST = FileList[SPREADSHEET_REDIST_NET40 + SPREADSHEET_REDIST_NET45]

if PLATFORM =~ /linux|darwin/
    # Copy pre-built binaries
    SPREADSHEET_REDIST.each do |file|
        file_copy :to => file,
                  :from => file.sub(SPREADSHEET_SRC_ROOT + '/bin', 'dist/binaries/spreadsheet')
    end
else
    # Build Telerik.Web.Spreadsheet
    file SPREADSHEET_SRC_ROOT + '/bin/Release/Telerik.Web.Spreadsheet.dll' => copy_dpl_binaries do
        msbuild SPREADSHEET_SRC_ROOT + '/Telerik.Web.Spreadsheet.csproj', "/p:Configuration=Release"
    end

    file SPREADSHEET_SRC_ROOT + '/bin/Release-NET45/Telerik.Web.Spreadsheet.dll' => copy_dpl_binaries do
        msbuild SPREADSHEET_SRC_ROOT + '/Telerik.Web.Spreadsheet.csproj', "/p:Configuration=Release-NET45"
    end

    tree :to => 'dist/binaries/spreadsheet/NET40',
         :from => SPREADSHEET_REDIST,
         :root => SPREADSHEET_SRC_ROOT + 'bin/Release/'

    tree :to => 'dist/binaries/spreadsheet/NET45',
         :from => SPREADSHEET_REDIST,
         :root => SPREADSHEET_SRC_ROOT + 'bin/Release-NET45/'
end

def copy_dpl_binaries
    {'WPF40' => { :dest => 'NET40' }, 'WPF45' => { :dest => 'NET45' }}.each do |key, value|
        DPL_FILES.each do |file|
            source = "#{DPL_DIST}\\#{key}\\Dev\\#{file}"
            dest = "dpl\\lib\\#{value[:dest]}"
            demos_dest = "demos\\mvc\\bin"

            system("xcopy #{source} #{dest} /d /y > nul")
            system("xcopy #{source} #{demos_dest} /d /y > nul") if value[:dest] == 'NET40'
            end
    end
end
