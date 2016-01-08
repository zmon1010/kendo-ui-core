DPL_FILES = [
    'Telerik.Windows.Documents.Core',
    'Telerik.Windows.Documents.Fixed',
    'Telerik.Windows.Documents.Flow',
    'Telerik.Windows.Documents.Flow.FormatProviders.Pdf',
    'Telerik.Windows.Documents.Spreadsheet',
    'Telerik.Windows.Documents.Spreadsheet.FormatProviders.OpenXml',
    'Telerik.Windows.Documents.Spreadsheet.FormatProviders.Pdf',
    'Telerik.Windows.Zip'
].flat_map { |file| ["#{file}.dll", "#{file}.xml"] }

SPREADSHEET_ROOT = 'dpl'
SPREADSHEET_SRC_ROOT = File.join(SPREADSHEET_ROOT, '/Telerik.Web.Spreadsheet')

def spreadsheet_dll_for(configuration)
    FileList['Telerik.Web.Spreadsheet.dll']
            .include('Telerik.Web.Spreadsheet.xml')
            .include('Newtonsoft.Json.dll')
            .include(DPL_FILES)
            .include('Telerik.Web.Spreadsheet.dll')
            .pathmap(SPREADSHEET_SRC_ROOT + "/bin/#{configuration}/%f")
end

SPREADSHEET_REDIST_BRANCH = BETA ? 'Stable' : 'Production'
SPREADSHEET_REDIST_ROOT = ARCHIVE_ROOT + "/Telerik.Web.Spreadsheet/#{SPREADSHEET_REDIST_BRANCH}"
SPREADSHEET_REDIST_NET40 = spreadsheet_dll_for('Release')
SPREADSHEET_REDIST_NET45 = spreadsheet_dll_for('Release-NET45')
SPREADSHEET_REDIST_NET40_TRIAL = spreadsheet_dll_for('Release-Trial')
SPREADSHEET_REDIST_NET45_TRIAL = spreadsheet_dll_for('Release-NET45-Trial')
SPREADSHEET_REDIST = FileList[SPREADSHEET_REDIST_NET40 + SPREADSHEET_REDIST_NET45 +
                              SPREADSHEET_REDIST_NET40_TRIAL + SPREADSHEET_REDIST_NET45_TRIAL]
SPREADSHEET_ASSEMBLY_INFO = SPREADSHEET_SRC_ROOT + '/Properties/AssemblyInfo.cs'

CLEAN.include(FileList[
    SPREADSHEET_SRC_ROOT + '/bin/**/*',
    SPREADSHEET_ROOT + '/lib/NET*/**/*'
])

# Copy pre-built binaries
if PLATFORM =~ /linux|darwin/
    tree :to => SPREADSHEET_SRC_ROOT + '/bin',
        :from => SPREADSHEET_REDIST_ROOT,
        :root => SPREADSHEET_REDIST_ROOT
else
    src = SPREADSHEET_REDIST_ROOT.gsub('/', '\\')
    dst = "#{SPREADSHEET_SRC_ROOT}/bin".gsub('/', '\\')
    system "xcopy #{src} #{dst} /s /i /d /y"
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

namespace :spreadsheet do
    desc('Build Telerik.Web.Spreadsheet binaries')
    task :binaries => SPREADSHEET_REDIST

    desc('Replace commercial binaries with trials')
    task :copy_trials => ['spreadsheet:binaries'] do
        [ 'aspnetmvc.hotfix.trial', 'aspnetmvc.trial' ].each do |bundle|
            {
                'Release-Trial' => 'net40',
                'Release-NET45-Trial' => 'net45'
            }.each do |build, target|
                src = SPREADSHEET_SRC_ROOT + "/bin/#{build}/*"
                dest = "dist/bundles/#{bundle}/spreadsheet/binaries/#{target}/"
                mkdir_p dest
                Dir.glob(src).each { |f| cp f, dest }
            end
        end
    end
end
