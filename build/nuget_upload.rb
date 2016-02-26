require 'version'
require 'pathname'

API_KEY = 'f6d3aacd-0b33-40e9-ba51-e19bc05a6bcf'

def archive_path
    if ENV["BETA"] != nil
        archive_folder = "Q#{VERSION_Q} #{VERSION_YEAR}/BETA"
    else
      if SERVICE_PACK_NUMBER != nil
        archive_folder = "Q#{VERSION_Q} #{VERSION_YEAR}/Q#{VERSION_Q} #{VERSION_YEAR} SP#{SERVICE_PACK_NUMBER}/#{VERSION.gsub('.', '_')}"
      else
        archive_folder = "Q#{VERSION_Q} #{VERSION_YEAR}/Q#{VERSION_Q} #{VERSION_YEAR}/#{VERSION.gsub('.', '_')}"
      end
    end

    File.join(RELEASE_ROOT, VERSION_YEAR.to_s, archive_folder)
end

def upload_nuget(nuget)
    path = Pathname.new File.join(archive_path, nuget)
    pwd = Pathname.new Dir.pwd
    sh "build/nuget/nuget.exe push '#{path.relative_path_from pwd}' -ApiKey #{API_KEY} -NonInteractive"
end
