require 'spreadsheet'

DPL_DIST = "\\\\telerik.com\\distributions\\DailyBuilds\\DocumentProcessing"

def copy_dpl_binaries
    branch = BETA ? 'Dev' : 'Release'
    source_dir = "#{DPL_DIST}\\#{branch}\\Binaries"
    puts "Copying DPL Binaries from #{source_dir}."

    {'Net40' => { :dest => 'NET40' }}.each do |key, value|
        ['Dev', 'Trial'].each do |license|
            suffix = license == 'Trial' ? '-Trial' : '';
            dest = "dpl\\lib\\#{value[:dest]}#{suffix}\\"

            DPL_FILES.each do |file|
                source = "#{source_dir}\\#{key}\\#{license}\\#{file}"
                system("xcopy #{source} #{dest} /y")
            end
        end
    end
end

# Update AssemblyInfo.cs whenever the VERSION constant changes
assembly_info_file SPREADSHEET_ASSEMBLY_INFO

namespace :spreadsheet do
    desc('Redistribute Telerik.Web.Spreadsheet')
    task :redist => 'spreadsheet:assembly_version' do
        copy_dpl_binaries

        ['Release', 'Release-Trial'].each do |configuration|
            msbuild SPREADSHEET_SRC_ROOT + '/Telerik.Web.Spreadsheet.csproj', "/p:Configuration=#{configuration}"
        end

        redist_dir = SPREADSHEET_REDIST_ROOT.gsub('/', '\\')
        src_root = SPREADSHEET_SRC_ROOT.gsub('/', '\\')

        system "xcopy #{src_root}\\bin #{redist_dir} /e /i /y"
    end

    desc('Update AssemblyInfo.cs with current VERSION')
    task :assembly_version => SPREADSHEET_ASSEMBLY_INFO
end
