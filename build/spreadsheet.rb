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

def spreadsheet_dll_for(configuration)
    FileList['Telerik.Web.Spreadsheet.dll']
            .include('Telerik.Web.Spreadsheet.xml')
            .include('Newtonsoft.Json.dll')
            .include(DPL_FILES)
            .include('Telerik.Web.Spreadsheet.dll')
            .pathmap(SPREADSHEET_SRC_ROOT + "/bin/#{configuration}/%f")
end

SPREADSHEET_ROOT = 'dpl'
SPREADSHEET_SRC_ROOT = SPREADSHEET_ROOT + '/Telerik.Web.Spreadsheet'
SPREADSHEET_REDIST_NET40 = spreadsheet_dll_for('Release')
SPREADSHEET_REDIST_NET45 = spreadsheet_dll_for('Release-NET45')
SPREADSHEET_REDIST = FileList[SPREADSHEET_REDIST_NET40 + SPREADSHEET_REDIST_NET45]

CLEAN.include(FileList[SPREADSHEET_ROOT + '/**/Telerik.Web.Spreadsheet.dll'])
rule 'Telerik.Web.Spreadsheet.xml' => SPREADSHEET_SRC_ROOT + '/bin/Release/Telerik.Web.Spreadsheet.dll'

if PLATFORM =~ /linux|darwin/
    # Copy pre-built binaries
    SPREADSHEET_REDIST.each do |file|
        file_copy :to => file,
                  :from => file.sub(SPREADSHEET_SRC_ROOT + '/bin', 'dist/binaries/spreadsheet')
    end
else
    # Build Telerik.Web.Spreadsheet
    file SPREADSHEET_SRC_ROOT + '/bin/Release/Telerik.Web.Spreadsheet.dll' do
        copy_dpl_binaries
        msbuild SPREADSHEET_SRC_ROOT + '/Telerik.Web.Spreadsheet.csproj', "/p:Configuration=Release"
    end

    file SPREADSHEET_SRC_ROOT + '/bin/Release-NET45/Telerik.Web.Spreadsheet.dll' do
        copy_dpl_binaries
        msbuild SPREADSHEET_SRC_ROOT + '/Telerik.Web.Spreadsheet.csproj', "/p:Configuration=Release-NET45"
    end

    tree :to => 'dist/binaries/spreadsheet',
         :from => SPREADSHEET_REDIST,
         :root => SPREADSHEET_SRC_ROOT + '/bin'
end

def copy_dpl_binaries
    {'WPF40' => { :dest => 'NET40' }, 'WPF45' => { :dest => 'NET45' }}.each do |key, value|
        dest = "dpl\\lib\\#{value[:dest]}\\"

        DPL_FILES.each do |file|
            source = "#{DPL_DIST}\\#{key}\\Dev\\#{file}"
            system("xcopy #{source} #{dest} /d /y > nul")
            end
    end
end

['commercial', 'internal.commercial'].each do |bundle|
    # Copy Source.snk as Kendo.snk (the original Kendo.snk should not be distributed)
    file_copy :to => "dist/bundles/aspnetmvc.#{bundle}/src/Telerik.Web.Spreadsheet/Telerik.Web.Spreadsheet/Kendo.snk",
              :from => 'wrappers/mvc/src/shared/Source.snk'

    # Copy Telerik.Web.Spreadsheet.csproj (needed for the next task)
    file_copy :to => "dist/bundles/aspnetmvc.#{bundle}/src/Telerik.Web.Spreadsheet/Telerik.Web.Spreadsheet/Telerik.Web.Spreadsheet.csproj",
              :from => SPREADSHEET_ROOT + '/Telerik.Web.Spreadsheet/Telerik.Web.Spreadsheet.csproj'

    # Copy Telerik.Web.Spreadsheet.sln in the src directory
    file_copy :to => "dist/bundles/aspnetmvc.#{bundle}/src/Telerik.Web.Spreadsheet/Telerik.Web.Spreadsheet.sln",
              :from => SPREADSHEET_ROOT + '/Telerik.Web.Spreadsheet.sln'

    # Patch the solution - leave only the Telerik.Web.Spreadsheet project
    file "dist/bundles/aspnetmvc.#{bundle}/src/Telerik.Web.Spreadsheet/Telerik.Web.Spreadsheet.sln" do |t|
        sln = File.read(t.name)

        #Remove the Telerik.Web.Spreadsheet.Tests project
        sln.sub!(/\s*Project.*?=\s*"Telerik\.Web.\Spreadsheet\.Tests"((.|\r|\n)*?)EndProject/, '')

        #Remove empty lines
        sln.gsub!(/^$\n/, '')

        File.write(t.name, sln)
    end

    # Copy the DPL libraries for NET40/NET45
    libs = FileList[SPREADSHEET_ROOT + '/lib/Newtonsoft.Json.dll']
          .include(FileList[DPL_FILES].pathmap(SPREADSHEET_ROOT + "/lib/NET40/%f"))
          .include(FileList[DPL_FILES].pathmap(SPREADSHEET_ROOT + "/lib/NET45/%f"))

    tree :to => "dist/bundles/aspnetmvc.#{bundle}/src/Telerik.Web.Spreadsheet/lib",
         :from => libs,
         :root => SPREADSHEET_ROOT + "/lib"
end

# Update AssemblyInfo.cs whenever the VERSION constant changes
assembly_info_file SPREADSHEET_ROOT + '/Telerik.Web.Spreadsheet/Properties/AssemblyInfo.cs'

namespace :spreadsheet do
    desc('Build Telerik.Web.Spreadsheet binaries')
    task :binaries => [
        SPREADSHEET_SRC_ROOT + '/bin/Release/Telerik.Web.Spreadsheet.dll',
        SPREADSHEET_SRC_ROOT + '/bin/Release-NET45/Telerik.Web.Spreadsheet.dll',
        'dist/binaries/spreadsheet'
    ]
end
