case node["platform"]
when "windows"
    windows_zipfile 'c:\nuget-uploader' do
        source '\\\\telerik.com\resources\AppDirector\Repositories\Uploader-SDK\Uploader.Sdk.59.zip'
        action :unzip
        not_if {::File.exists?('c:\nuget-uploader\MetadataTool\Telerik.Metadata.Tool.exe')}
    end
end
