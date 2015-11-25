case node["platform"]
when "windows"
    windows_package "Git for Windows 2.6.3" do
        source "https://github.com/git-for-windows/git/releases/download/v2.6.3.windows.1/Git-2.6.3-64-bit.exe"
        action :install
    end

    execute "Set HOME environtment variable" do
        command 'setx HOME "%USERPROFILE%"'
    end
else
    package "git"
end
