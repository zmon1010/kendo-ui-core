require 'github_api'
require 'singleton'
require 'erb'

CHANGELOG_TEMPLATE = ERB.new(File.read(File.join(File.dirname(__FILE__), 'changelog.html.erb')), 0, '%<>')
CHANGELOG_XML_TEMPLATE = ERB.new(File.read(File.join(File.dirname(__FILE__), 'changelog.xml.erb')), 0, '%<>')

class Issue
    attr_reader :suites, :components, :internal, :framework, :bug, :new_component, :link, :id
    attr_accessor :title
    def initialize(issue)
        @title = issue.title
        @labels = issue.labels.map {|l| l.name }
        @link = issue.html_url
        @id = issue.number
        @internal = @labels.join(" ") =~ /Documentation|Internal|Deleted|Invalid|Won't Fix/
        @bug = @labels.include? "Bug"
        @new_component = @labels.include? "New Component"

        @suites = filtered_labels :s

        @suites.push "components" if @suites.length == 0

        @components = filtered_labels(:w) | filtered_labels(:f) | filtered_labels(:c)
    end

    def breaking?
        @labels.include? "Breaking Change"
    end

    def filtered_labels(prefix)
        @labels.grep(/#{prefix}:/i) { |l| l.split(":")[1].strip }
    end

    def framework_construct?
        @labels.join(" ") =~ /\b(View|Popup|FX)\b/
    end
end

class Component
    attr_reader :bugs, :features
    def initialize
        @features = []
        @bugs = []
    end

    def add(issue)
        if issue.bug
            @bugs.push issue
        else
            @features.push issue
        end
    end
end

class Suite
    attr_reader :bugs, :features, :title, :key, :new_components
    attr_accessor :components
    def initialize(title, key)
        @title = title
        @key = key
        @features = []
        @bugs = []
        @new_components = []
        @components = {}
    end

    def add(issue)
        if issue.new_component
            @new_components.push issue
        elsif issue.components.length == 0 || issue.framework_construct?
            if issue.bug
                @bugs.push issue
            else
                @features.push issue
            end
        elsif issue.components
            issue.components.each do |component_name|
                (@components[component_name] ||= Component.new).add(issue)
            end
        end
    end
end

class ChangeLog
    include Singleton
    attr_reader :suites

    def initialize
        @suites = [
            Suite.new("Components", "components"),
            Suite.new("Wrappers (ASP.NET MVC)", "aspnetmvc"),
            Suite.new("Wrappers (Java)", "java"),
            Suite.new("Wrappers (PHP)", "php")
        ]

        @milestones = {}

        fetch_issues
    end

    def fetch_issues
        closed_issues.map { |issue| Issue.new(issue) }.each do |issue|
            next if issue.internal
            issue.suites.each do |suite_name|
                find_suite(suite_name).add(issue)
            end
        end
        suites.each do |suite|
            suite.components = Hash[suite.components.sort]
        end
    end

    def render_changelog(template, suite_names, exclude, standalone, product)
        exclude ||= []
        suites = @suites.select { |suite| suite_names.include? suite.key }
        template.result(binding)
    end

    private

    def find_suite(key)
        @suites.find { |s| s.title == key } || @suites[0]
    end

    def api_for(repo_name)
        Github.new :oauth_token => '39bacd99458f1a463b938854c2da9af6c929ed6a',
                   :user => "telerik",
                   :repo => repo_name,
                   :auto_pagination => true
    end

    def private_repo
        @private_repo ||= api_for "kendo"
    end

    def public_repo
        @public_repo ||= api_for "kendo-ui-core"
    end

    def issues_from(milestones)
        milestones.map { |milestone| milestone_issues(milestone) }.flatten
    end

    def closed_issues
        issues_from(current_milestones(public_repo)) + issues_from(current_milestones(private_repo))
    end

    def current_milestones(repo)
        milestones_for(repo).select { |milestone| current_milestone_names.include? milestone.title.downcase }
    end

    def milestone_issues(milestone)
        repo = repo_by(milestone)

        $stderr.puts "Fetching issues from #{repo.repo} repo, #{milestone.title} (#{milestone.number})" if VERBOSE
        issues = repo.issues.list(
            :user => 'telerik',
            :repo => repo.repo,
            :state => "closed",
            :milestone => milestone.number
        ).to_a
    end

    def repo_by(milestone)
        milestone.url =~ /kendo-ui-core/ ? public_repo : private_repo
    end

    def milestones_for(repo)
        repo_milestones = repo.issues.milestones

        @milestones[repo] ||=
            repo_milestones.list(:state => "open").to_a +
            repo_milestones.list(:state => "closed").to_a
    end

    def current_milestone_names
       names = [self.class.milestone_name(VERSION_YEAR, VERSION_Q, VERSION_SERVICE_PACK)]

       if (!VERSION_SERVICE_PACK)
            q = VERSION_Q - 1;
            year = VERSION_YEAR

            if (q === 0)
                year -= 1
                q = 3;
            end

            names.unshift self.class.milestone_name(year, q, "next")
       end

       names.map &:downcase
    end

    class << self
        def milestone_name(year, quarter, service_pack)
            service_pack = "." + service_pack if service_pack == "next"
            "#{year}.Q#{quarter}#{".SP#{service_pack}" if service_pack}"
        end
    end
end

class WriteChangeLogTask < Rake::FileTask
    include Rake::DSL
    attr_accessor :suites, :exclude, :product

    def template(name)
        return CHANGELOG_XML_TEMPLATE if name =~ /.xml$/

        CHANGELOG_TEMPLATE
    end

    def standalone?
        return true if name =~ /.txt$/
    end

    def execute(args)
        ensure_path name
        File.open(name, 'w') { |file| file.write(contents(template(name))) }
    end

    def contents(render_template)
        @contents ||= ChangeLog.instance.render_changelog(render_template, suites, exclude, standalone?, product)
    end

    def needed?
        !File.exist?(name) || File.read(name).strip != contents(template(name)).strip
    end
end

def write_changelog(path, suites, exclude = [], product = 'Kendo UI')
    task = WriteChangeLogTask.define_task(path)
    task.suites = suites
    task.exclude = exclude
    task.product = product
end
