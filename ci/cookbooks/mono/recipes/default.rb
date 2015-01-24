apt_repository "mono" do
    uri "http://download.mono-project.com/repo/debian"
    distribution "wheezy"
    components ["main"]
    keyserver "hkp://keyserver.ubuntu.com:80/"
    key "3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF"
end

# needed for 12.04
apt_repository "mono-tiffcompat" do
    uri "http://download.mono-project.com/repo/debian"
    distribution "wheezy-libtiff-compat"
    components ["main"]
    keyserver "hkp://keyserver.ubuntu.com:80/"
    key "3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF"
end

package "mono-complete"
package "mono-xsp4"
package "mono-xbuild"
package "nuget"

remote_directory '/usr/lib/mono/4.0' do
    source 'assemblies'
end

remote_directory '/usr/lib/mono/xbuild/Microsoft/VisualStudio/v10.0' do
    source 'v10.0'
end

