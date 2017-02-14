require 'spreadsheet'

DPL_DIST = "\\\\telerik.com\\distributions\\DailyBuilds\\DocumentProcessing"
DPL_BRANCH = 'Release';
DPL_ROOT_DIR = "#{DPL_DIST}\\#{DPL_BRANCH}"

def copy_dpl_binaries
    source_dir = "#{DPL_ROOT_DIR}\\Binaries"
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

def copy_dpl_redist
    redist_dir = SPREADSHEET_REDIST_ROOT.gsub('/', '\\')

    {'Dev' => { :license => 'Release' }, 'Trial' => { :license => 'Release-Trial' }}.each do |license, dest|
        dest = "#{redist_dir}\\#{dest[:license]}"

        # Copy NuGets
        nuget_source = "#{DPL_ROOT_DIR}\\Nugets\\Net40\\#{license}\\*"
        system("del /q #{dest}\\nugets\\*.*")
        system("xcopy #{nuget_source} #{dest}\\nugets\\ /d /y")
    end

    # Copy Sources
    src_source = "#{DPL_ROOT_DIR}\\SourceCode\\*"
    system("del /q #{redist_dir}\\source\\*.*")
    system("xcopy #{src_source} #{redist_dir}\\source\\ /d /y")
end

# Update AssemblyInfo.cs whenever the VERSION constant changes
assembly_info_file SPREADSHEET_ASSEMBLY_INFO

namespace :spreadsheet do
    desc('Redistribute Telerik.Web.Spreadsheet')
    task :redist => 'spreadsheet:assembly_version' do
        copy_dpl_binaries
        copy_dpl_redist

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
