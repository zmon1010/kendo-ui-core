require 'erb'

DEPENDENCIES_TEMPLATE = ERB.new(File.read(File.join(File.dirname(__FILE__), 'javascript_dependencies.md.erb')), 0, '%<>')


def add_dependencies(widget, dependency, dependencies)
    unless widget["dependencies"].include? dependency
        if dependencies[dependency]
            dependencies[dependency].each do |parent_dependency|
                add_dependencies(widget, parent_dependency, dependencies)
            end
        end
        widget["dependencies"] << dependency
    end
end

ID_MAP = {
    "chart" => "chart-api",
    "draganddrop" => "dragdrop",
    "sparkline" => "sparklines",
    "stockchart" => "financial",
    "router" => "spa"
}

URL_MAP = {
    "core" => "https://github.com/telerik/kendo-ui-core",
    "angular" => "http://docs.telerik.com/kendo-ui/AngularJS/introduction",
    "angular2" => "http://demos.telerik.com/kendo-ui/integration/angular2",
    "aspnetmvc" => "http://docs.telerik.com/kendo-ui/aspnet-mvc/introduction",
    "gauge" => "http://demos.telerik.com/kendo-ui/linear-gauge/index",
    "touch" => "http://demos.telerik.com/kendo-ui/m/index#touchevents/mobile",
    "fx" => "http://demos.telerik.com/kendo-ui/fx/expand",
    "view" => "http://demos.telerik.com/kendo-ui/m/index#mobile-view/index"
}

def demo_for(id)
    mobile = id =~ /mobile\./i
    section = id.downcase.gsub(/(dataviz|mobile)\./, "")
    section = ID_MAP[section] if ID_MAP[section]

    return URL_MAP[section] if URL_MAP[section]

    return "http://demos.telerik.com/kendo-ui/m/index##{section}/index" if mobile

    "http://demos.telerik.com/kendo-ui/#{section}/index"
end

desc 'Generate js dependencies'
task :js_dependencies do
    dependencies = {}

    data = YAML.load(`node #{METAJS} --kendo-config`)
    categories = [
        {
            'name' => 'Data Management Widgets',
            'slug' => 'script_filesfor_datamanagement_widgets',
            'file' => 'docs/intro/supporting/scripts-general.md',
            'description' => 'Below are listed the script files for the Kendo UI desktop widgets for mobile-ready websites and applications.',
            'include' => /^(grid|listview|pivotgrid|spreadsheet|treelist)$/i
        },
        {
            'name' => 'Editors',
            'slug' => 'script_filesfor_editors_widgets',
            'file' => 'docs/intro/supporting/scripts-editors.md',
            'description' => 'Below are listed the script files for the Kendo UI Editors widgets.',
            'include' => /^(autocomplete|.*picker|combobox|dropdownlist|editor|.*textbox|multiselect|.*slider|upload|validator)$/i
        },
        {
            'name' => 'Charts',
            'slug' => 'script_filesfor_charts_widgets',
            'file' => 'docs/intro/supporting/scripts-dataviz.md',
            'description' => 'Below are listed the script files for the Kendo UI Charts widgets.',
            'include' => /^dataviz\.(chart|sparkline|stockchart|treemap)$/i
        },
        {
            'name' => 'Gauges',
            'slug' => 'script_filesfor_gauges_widgets',
            'file' => 'docs/intro/supporting/scripts-gauges.md',
            'description' => 'Below are listed the script files for the Kendo UI Gauges widgets.',
            'include' => /^dataviz\.(gauge)$/i
        },
        {
            'name' => 'Barcodes',
            'slug' => 'script_filesfor_barcodes_widgets',
            'file' => 'docs/intro/supporting/scripts-barcodes.md',
            'description' => 'Below are listed the script files for Kendo UI Barcodes widgets.',
            'include' => /^dataviz\.(barcode|qrcode)$/i
        },
        {
            'name' => 'Server-Side Wrappers',
            'slug' => 'script_filesfor_serverside_wrappers',
            'file' => 'docs/intro/supporting/scripts-wrappers.md',
            'description' => 'Below are listed the script files for the Kendo UI supplementary scripts for integration with server-side technologies.',
            'include' => /^aspnetmvc/i
        },
        {
            'name' => 'Diagrams and Maps',
            'slug' => 'script_filesfor_diagramsandmaps_widgets',
            'file' => 'docs/intro/supporting/scripts-diagrams-maps.md',
            'description' => 'Below are listed the script files for the Kendo UI Diagrams and Maps widgets.',
            'include' => /^dataviz\.(diagram|map)$/i
        },
        {
            'name' => 'Scheduling',
            'slug' => 'script_filesfor_scheduling_widgets',
            'file' => 'docs/intro/supporting/scripts-scheduling.md',
            'description' => 'Below are listed the script files for the Kendo UI Scheduling widgets.',
            'include' => /^(scheduler|calendar|gantt)$/i
        },
        {
            'name' => 'Layout',
            'slug' => 'script_filesfor_layout_widgets',
            'file' => 'docs/intro/supporting/scripts-layout.md',
            'description' => 'Below are listed the script files for the Kendo UI Layout widgets.',
            'include' => /^(notification|responsive-panel|splitter|tooltip|window)$/i
        },
        {
            'name' => 'Navigation',
            'slug' => 'script_filesfor_navigation_widgets',
            'file' => 'docs/intro/supporting/scripts-navigation.md',
            'description' => 'Below are listed the script files for the Kendo UI Navigation widgets.',
            'include' => /^(button|menu|panelbar|tabstrip|toolbar|treeview)$/i
        },
        {
            'name' => 'Interactivity and UX',
            'slug' => 'script_filesfor_interactivityandux_widgets',
            'file' => 'docs/intro/supporting/scripts-interactivity.md',
            'description' => 'Below are listed the script files for the Kendo UI Interactivity and UX widgets.',
            'include' => /^(draganddrop|fx|progressbar|sortable)$/i
        },
        {
            'name' => 'Hybrid UI',
            'slug' => 'script_filesfor_hybridui_widgets',
            'file' => 'docs/intro/supporting/scripts-hybridui.md',
            'description' => 'Below are listed the script files for the Kendo UI Hybrid frameworks and widgets.',
            'include' => /^(mobile\..*)$/i
        },
        {
            'name' => 'Tools, Frameworks and Utilities',
            'slug' => 'script_filesfor_tools_frameworks_utilities',
            'file' => 'docs/intro/supporting/scripts-frameworks.md',
            'description' => 'Below are listed the script files for the Kendo UI shared components providing behaviors, data access. and other services.',
            'include' => /^(angular.*|mvvm|core|datasource|drawing|pdf-export|router|(mobile\.router|touch|view))$/i
        }
    ]

    categories.each do |category|
        category["components"] = []
    end

    data["components"].each do |component|
        dependencies[component["id"]] = component["depends"]
        unless component["hidden"] || component["advanced"]
            categories.each do |cat|
                if component["id"] =~ cat["include"]
                    cat["components"] << component
                    break
                end
            end
        end
    end

    categories.each_with_index do |category, position|
        category["position"] = position + 3
        category["components"].each do |component|
            component["dependencies"] = []
            component["features"] ||= []
            component["url"] = demo_for(component["id"])
            add_dependencies(component, component["id"], dependencies)
            component["features"].each do |feature|
                feature["dependencies"] = []
                feature["depends"].each do |dependency|
                    add_dependencies(feature, dependency, dependencies)
                end
            end
        end
    end

    categories.each do |category|
        next unless category["file"]
        File.open(category["file"], 'w') do |file|
            file.write(DEPENDENCIES_TEMPLATE.result(binding))
        end
    end
end
