def push_bower(repository_url, work_dir, bundle_path, meta = nil)
    if meta
        tag = "#{VERSION}+#{meta}"
    else
        tag = VERSION
    end

    sh({ 'VERSION' => VERSION, 'TAG' => tag }, "build/bower", repository_url, work_dir, bundle_path)
end

namespace :bower do
    task :push do
       push_bower "git@github.com:telerik/bower-kendo-ui.git", "dist/bower-repo", "dist/bundles/professional.commercial"
    end

    task :push_core do
       push_bower "git@github.com:kendo-labs/bower-kendo-ui.git", "dist/bower-core-repo", "dist/bundles/core"
    end
end

