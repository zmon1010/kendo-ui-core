
task :npm do
    gulp "npm-pro"

    repo_url = "git@github.com:telerik/npm-kendo-ui.git"
    repo_path = "dist/npm-kendo-ui"

    npmgit = "git --work-tree=#{repo_path} --git-dir=#{repo_path}/.git"

    SYNC_NPM = <<-SH
        cd /usr/share/nginx/html;
        if [ ! -d npm-kendo-ui.git ]; then
            git clone --bare git@github.com:telerik/npm-kendo-ui.git;
            cd npm-kendo-ui.git;
            git config http.receivepack false;
        fi

        cd npm-kendo-ui.git;
        git fetch;
        git fetch --tags --prune origin;
    SH

    sh <<-SHELL
    if [ ! -d #{repo_path} ]; then
        git clone #{repo_url} #{repo_path};
    else
        #{npmgit} fetch;
        #{npmgit} reset --hard origin/master;
        #{npmgit} clean -dfx;
    fi;

    rm -rf #{repo_path}/*;
    cp -r dist/npm/* #{repo_path};

    #{npmgit} add --all .;
    #{npmgit} commit --message "Update to #{VERSION}";
    #{npmgit} tag --force --annotate "#{VERSION}" --message "#{VERSION}";
    #{npmgit} push --force origin master:master;
    #{npmgit} push --force origin "#{VERSION}";

    ssh nginx@ordkendobower01.telerik.local '#{SYNC_NPM}';

    SHELL

end

task "release_builds:bundles:all" => "npm"
