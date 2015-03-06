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

namespace :bower do
    task :push do
       push_bower "git@github.com:telerik/bower-kendo-ui.git", "dist/bower-repo", "dist/bundles/professional.commercial"
       sh "build/sync-bower"
    end

    task :push_core do
       push_bower "git@github.com:kendo-labs/bower-kendo-ui.git", "dist/bower-core-repo", "dist/bundles/core"
    end

    task :push_appbuilder_core do
       push_appbuilder_bower "git@github.com:kendo-labs/bower-kendo-ui-appbuilder.git", "dist/bower-core-appbuilder-repo", "dist/bundles/appbuilder.core"
    end
end

