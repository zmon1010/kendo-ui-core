require 'erb'

def description(name)
    name = name.split(/\W/).map { |c| c.capitalize }.join(' ')

    "Build Kendo UI #{name}"
end

def bundle(options)
    name = options[:name]
    eula = options[:eula]
    readme = options[:readme]
    readme_src = options[:readme_src]
    vsdoc_sources = options[:vsdoc]
    intellisense_sources = options[:intellisense]
    vsdoc_dest = options[:vsdoc_dest] || "vsdoc"
    type_script_sources = options[:type_script]
    changelog_suites = options[:changelog]
    demo_suites = options[:demos]
    path = "dist/bundles/#{name}"
    beta = options[:beta] || BETA
    legal_dir = File.join('resources', 'legal', beta ? 'beta' : 'official')
    license = nil

    prerequisites = [:js, :less] + options[:prerequisites].to_a

    add_file = lambda do |to, from|
        dest = File.join(path, to, File.basename(from))
        file_copy :from => from, :to => dest
        prerequisites.push(dest)
    end

    unless options[:skip_grunt_build]
        add_file.call('src', 'build/dist-gulp/package.json')
        add_file.call('src', 'build/dist-gulp/npm-shrinkwrap.json')
        add_file.call('src', 'build/dist-gulp/gulpfile.js')
        add_file.call('src/js/', 'src/jquery.js')
    end

    if options[:license]
        license = "#{path}.license"
        file_license license => File.join(legal_dir, "#{options[:license]}.txt")
    end

    options[:contents].each do |target, contents|

        root = ROOT_MAP[target]

        raise "Nothing specified for '#{target}' in ROOT_MAP" unless root

        to = File.join(path, target)

        tree :to => to,
             :from => contents,
             :root => root,
             :license => license

        prerequisites.push(to)
    end

    if eula
        license_agreements_path = File.join(path, "license-agreements")
        third_party_path = File.join(license_agreements_path, "third-party")
        eula_dir = beta ? "eula" : eula + "-eula"
        source_path = File.join(legal_dir, eula_dir)

        tree :to => license_agreements_path,
             :from =>  File.join(source_path, "*"),
             :root => source_path

        tree :to => third_party_path,
             :from =>  File.join(THIRD_PARTY_LEGAL_DIR, "*"),
             :root => THIRD_PARTY_LEGAL_DIR

        prerequisites.push(license_agreements_path)
        prerequisites.push(third_party_path)
    end

    if readme
        readme_path = File.join(path, "README")
        file_copy :to => readme_path, :from => File.join(README_DIR, "#{readme}.txt")
        prerequisites.push(readme_path)
    end

    if readme_src
        readme_src_path = File.join(path, 'src', 'README')
        file_copy :to => readme_src_path, :from => File.join(README_DIR, "#{readme_src}.txt")
        prerequisites.push(readme_src_path)
    end

    if vsdoc_sources
        vsdoc_sources.each do |file|
            vsdoc_path = File.join(path, vsdoc_dest, "kendo.#{file}-vsdoc.js")
            vsdoc vsdoc_path => md_api_suite(file)
            prerequisites.push(vsdoc_path)
        end
    end

    if intellisense_sources
        intellisense_sources.each do |file|
            intellisense_path = File.join(path, vsdoc_dest, "kendo.#{file}.min.intellisense.js")
            intellisense intellisense_path => md_api_suite(file)
            prerequisites.push(intellisense_path)
        end
    end

    if type_script_sources
        type_script_build_files = FileList["build/codegen/lib/type_script/*.*"]

        type_script_sources.each do |file|
            type_script_path = File.join(path, "typescript", "kendo.#{file}.d.ts")
            type_script type_script_path => [md_api_suite(file), type_script_build_files].flatten
            prerequisites.push(type_script_path)
        end
    end

    if changelog_suites
        changelog_path = File.join(path, "changelog.html")
        write_changelog(changelog_path, changelog_suites,
                        options[:changelog_exclude], options[:product])
        prerequisites.push(changelog_path)
    end

    if demo_suites

        demo_dirs = demo_suites[:dir]

        demo_dirs = [demo_dirs] unless demo_dirs.is_a? Array

        demo_files = demo_dirs.map do |dir|
            demos({
                :path => "#{path}/#{dir}",
                :template_dir => demo_suites[:template_dir]
            })
        end

        prerequisites = prerequisites + demo_files.flatten
    end

    if options[:post_build]
        if options[:post_build].kind_of?(Array)
            prerequisites.push(*options[:post_build])
        else
            prerequisites.push(options[:post_build])
        end
    end

    zip "#{path}.zip" =>  prerequisites
    szip "#{path}.7z" =>  prerequisites

    desc description(name)
    task "bundles:#{name}" => ["#{path}.zip", "#{path}.7z"]

    xml_changelog_path = "dist/bundles/#{name}.changelog.xml"
    write_changelog(xml_changelog_path, changelog_suites,
                    options[:changelog_exclude], options[:product])

    txt_changelog_path = "dist/bundles/#{name}.changelog.txt"
    write_changelog(txt_changelog_path, changelog_suites,
                    options[:changelog_exclude], options[:product])

    if options[:upload_to_appbuilder]
        versioned_bundle_path = File.join(ARCHIVE_ROOT, 'AppBuilder/Uploads', VERSION, versioned_bundle_name(name) + ".zip")

        file_copy :to => versioned_bundle_path, :from => "#{path}.zip"

        desc "Upload #{name} in AppBuidler"
        task "appbuilder_builds:bundles:#{name}" => [versioned_bundle_path, changelog_path] do
            if options[:skip_changelog_in_zip]
                Zip::File.open(versioned_bundle_path, Zip::File::CREATE) do |file|
                    file.remove("changelog.html")
                end
            end
            sh  *["./build/appbuilder-upload.js", options[:product], VERSION, versioned_bundle_path, changelog_path, "false", options[:appbuilder_features]].compact
        end

        desc "Upload bundles in AppBuidler"
        task "appbuilder_builds:bundles:all" => "appbuilder_builds:bundles:#{name}"

        desc "Upload #{name} in AppBuidler (verified)"
        task "appbuilder_builds:bundles:verified:#{name}" => [versioned_bundle_path, changelog_path] do
            if options[:skip_changelog_in_zip]
                Zip::File.open(versioned_bundle_path, Zip::File::CREATE) do |file|
                    file.remove("changelog.html")
                end
            end
            sh  *["./build/appbuilder-upload.js", options[:product], VERSION, versioned_bundle_path, changelog_path, "true", options[:appbuilder_features]].compact
        end

        desc "Upload bundles in AppBuidler"
        task "appbuilder_builds:bundles:verified:all" => "appbuilder_builds:bundles:verified:#{name}"
    end
end

