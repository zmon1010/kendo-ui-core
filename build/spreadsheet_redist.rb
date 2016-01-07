require 'spreadsheet'

DPL_DIST = "\\\\telerik.com\\distributions\\DailyBuilds\\DocumentProcessing"

def copy_dpl_binaries
    branch = BETA ? 'Dev' : 'Release'
    source_dir = "#{DPL_DIST}\\#{branch}\\Binaries"
    puts "Copying DPL Binaries from #{source_dir}. Should be either Dev or Release."

    {'WPF40' => { :dest => 'NET40' }, 'WPF45' => { :dest => 'NET45' }}.each do |key, value|
        ['Dev', 'Trial'].each do |license|
            suffix = license == 'Trial' ? '-Trial' : '';
            dest = "dpl\\lib\\#{value[:dest]}#{suffix}\\"

            DPL_FILES.each do |file|
                source = "#{source_dir}\\#{key}\\#{license}\\#{file}"
                system("xcopy #{source} #{dest} /d /y > nul")
            end
        end
    end
end

['Release', 'Release-NET45', 'Release-Trial', 'Release-NET45-Trial'].each do |configuration|
    # Build Telerik.Web.Spreadsheet
    file SPREADSHEET_SRC_ROOT + "/bin/#{configuration}/Telerik.Web.Spreadsheet.dll" => 'spreadsheet:assembly_version' do
        copy_dpl_binaries
        msbuild SPREADSHEET_SRC_ROOT + '/Telerik.Web.Spreadsheet.csproj', "/p:Configuration=#{configuration}"
    end
end

# Update AssemblyInfo.cs whenever the VERSION constant changes
assembly_info_file SPREADSHEET_ASSEMBLY_INFO

namespace :spreadsheet do
    desc('Redistribute Telerik.Web.Spreadsheet')
    task :redist => [
        SPREADSHEET_SRC_ROOT + '/bin/Release/Telerik.Web.Spreadsheet.dll',
        SPREADSHEET_SRC_ROOT + '/bin/Release-NET45/Telerik.Web.Spreadsheet.dll',
        SPREADSHEET_SRC_ROOT + '/bin/Release-Trial/Telerik.Web.Spreadsheet.dll',
        SPREADSHEET_SRC_ROOT + '/bin/Release-NET45-Trial/Telerik.Web.Spreadsheet.dll'
    ] do
        redist_dir = SPREADSHEET_REDIST_ROOT.gsub('/', '\\')
        src_root = SPREADSHEET_SRC_ROOT.gsub('/', '\\')

        ['Release', 'Release-NET45', 'Release-Trial', 'Release-NET45-Trial'].each do |configuration|
            source = "#{src_root}\\bin\\#{configuration}"
            dest = "#{redist_dir}\\#{configuration}"

            system "xcopy #{source} #{dest} /d /y > nul"
        end
    end

    desc('Update AssemblyInfo.cs with current VERSION')
    task :assembly_version => SPREADSHEET_ASSEMBLY_INFO
end
