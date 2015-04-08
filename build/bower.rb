def exec_bower_script(script, repository_url, work_dir, bundle_path, meta = nil)
    if meta
        tag = "#{VERSION}+#{meta}"
    else
        tag = VERSION
    end

    sh({ 'VERSION' => VERSION, 'TAG' => tag }, script, repository_url, work_dir, bundle_path)
end

def push_bower(repository_url, work_dir, bundle_path, meta = nil)
    exec_bower_script "build/bower", repository_url, work_dir, bundle_path, meta
end

def push_appbuilder_bower(repository_url, work_dir, bundle_path, meta = nil)
    exec_bower_script "build/appbuilder-bower", repository_url, work_dir, bundle_path, meta
end

def push_bowers(meta = nil)
    push_bower "git@github.com:telerik/bower-kendo-ui.git", "dist/bower-repo", "dist/bundles/aspnetmvc.commercial", meta
    push_bower "git@github.com:kendo-labs/bower-kendo-ui.git", "dist/bower-core-repo", "dist/bundles/core", meta
    push_appbuilder_bower "git@github.com:kendo-labs/bower-kendo-ui-appbuilder.git", "dist/bower-core-appbuilder-repo", "dist/bundles/appbuilder.core", meta
    sh "build/sync-bower"
end

BOWER_BUNDLES = ["build:production:get_binaries", "bundles:aspnetmvc.commercial", "bundles:core", "bundles:appbuilder.core"]
namespace :bower do
    task :internal_build => BOWER_BUNDLES do
        push_bowers
    end

    task :official => BOWER_BUNDLES do
        push_bowers SERVICE_PACK_NUMBER ?  "SP#{SERVICE_PACK_NUMBER}" :  "Official"
    end
end

task "release_builds:bundles:all" => "bower:official"
