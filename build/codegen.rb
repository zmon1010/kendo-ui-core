require 'codegen/lib/options'
require 'codegen/lib/field'
require 'codegen/lib/markdown_parser'
require 'codegen/lib/component'

require 'nokogiri'
require 'codegen/lib/mvc/api'
require 'codegen/lib/mvc/mvc'
require 'codegen/lib/mvc/mobile'
require 'codegen/lib/mvc/dataviz'
require 'codegen/lib/mvc-6/main'
require 'codegen/lib/java/module'
require 'codegen/lib/java/composite_option'
require 'codegen/lib/java/event'
require 'codegen/lib/java/option'
require 'codegen/lib/java/component'
require 'codegen/lib/java/tld'
require 'codegen/lib/java/jsp'
require 'codegen/lib/java/api'

require 'codegen/lib/php/options'
require 'codegen/lib/php/composite_option'
require 'codegen/lib/php/event'
require 'codegen/lib/php/option'
require 'codegen/lib/php/component'
require 'codegen/lib/php/php'
require 'codegen/lib/php/api'

require 'codegen/lib/aspx/aspx'

namespace :generate do
    def import_metadata(component, path = '')
        metadata = "build/codegen/#{path}#{component.name.downcase}.yml"

        if File.exists?(metadata)
            yaml = YAML.load(File.read(metadata))

            component.import(yaml)
        end
    end

    desc 'Generate all server wrappers and their API reference'
    task :all => [:php, :jsp, 'mvc:wrappers']

    namespace :aspx do

        desc 'Generate ASP.NET WebForms wrappers'
        task :wrappers do
            markdown = FileList[
                'docs/api/javascript/dataviz/ui/diagram.md',
                'docs/api/javascript/dataviz/diagram/connection.md',
                'docs/api/javascript/dataviz/diagram/shape.md',
                'docs/api/javascript/dataviz/ui/map.md'
            ]


            components = markdown.map { |file| CodeGen::MarkdownParser.read(file, CodeGen::ASPX::Wrappers::Component) }

            components.each do |component|
                import_metadata(component, "lib/aspx/")
                folderName = component.widget? ? component.name : component.owner_namespace
                folderPath = "wrappers/aspx/src/#{folderName}/"
                sh "mkdir -p #{folderPath}" unless Dir.exists?(folderPath)
                generator = CodeGen::ASPX::Wrappers::Generator.new(folderPath)

                generator.component(component)
            end

            converters = CodeGen::ASPX::Wrappers::Generator.converters

            converters.keys.each do |widget_name|
                content = ''
                converters[widget_name].each_index do |index|
                    converter = converters[widget_name][index]
                    content += "new #{converter}()"
                    content += ",\n" unless index >= converters[widget_name].length - 1
                end

                file_path = "wrappers/aspx/src/#{widget_name}/Rad#{widget_name}.cs"

                CodeGen::ASPX::Wrappers::Generator.write_file(file_path, content, '[ Converters Declaration ]')
            end
        end

        desc 'Temp task that cleans the ASPX\'s output  folder!'
        task :clean do
            sh 'rm -rdf wrappers/aspx/src/*'
        end

    end

    namespace :mvc do

        desc 'Generate MVC DataViz and Mobile wrappers'
        task :wrappers => ['mvc:dataviz:wrappers', 'mvc:mobile:wrappers']

        desc 'Generate MVC API reference'
        task :api => 'Kendo.Mvc.xml' do
            parser = CodeGen::MVC::API::XmlParser.new('wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.xml')

            generator = CodeGen::MVC::API::Generator.new('docs/api/aspnet-mvc/')

            parser.components do |component|
                generator.component(component)
            end
        end

        namespace :dataviz do
            desc 'Generate MVC DataViz wrappers'
            task :wrappers do
                markdown = FileList[
                    'docs/api/javascript/dataviz/ui/map.md',
                    'docs/api/javascript/dataviz/ui/diagram.md',
                    'docs/api/javascript/dataviz/ui/treemap.md',
                    'docs/api/javascript/ui/colorpicker.md',
                    'docs/api/javascript/ui/editor.md',
                    'docs/api/javascript/ui/gantt.md',
                    'docs/api/javascript/ui/responsivepanel.md',
                    'docs/api/javascript/ui/toolbar.md',
                    'docs/api/javascript/ui/treelist.md',
                    'docs/api/javascript/ui/treeview.md'
                ]

                components = markdown.map { |filename| CodeGen::MarkdownParser.read(filename, CodeGen::MVC::Wrappers::DataViz::Component) }
                    .sort { |a, b| a.name <=> b.name }

                component_register = ''

                components.each do |component|

                    import_metadata(component)

                    generator = CodeGen::MVC::Wrappers::Generator.new('wrappers/mvc/src/Kendo.Mvc/UI')

                    generator.component(component)

                    generator.cs_proj(component)

                    component.register(component_register)
                end

                factory_file = 'wrappers/mvc/src/Kendo.Mvc/UI/WidgetFactory.cs'

                content = File.read(factory_file)

                content = content.sub(/\/\/>> DataVizComponents(.|\n)*\/\/<< DataVizComponents/,
                             "//>> DataVizComponents #{component_register}//<< DataVizComponents")

                File.write(factory_file, content.dos)
            end
        end

        namespace :mobile do

            desc 'Generate MVC Mobile wrappers'
            task :wrappers do
                markdown = FileList['docs/api/javascript/mobile/ui/*.md', 'docs/api/javascript/mobile/application.md'].exclude(/listview|swipe|loader|pane|touch|scroller|mobilewidget/)

                components = markdown.map { |filename| CodeGen::MarkdownParser.read(filename, CodeGen::MVC::Wrappers::Mobile::Component) }
                    .sort { |a, b| a.name <=> b.name }

                component_register = ''

                components.each do |component|

                    import_metadata(component)

                    generator = CodeGen::MVC::Wrappers::Generator.new('wrappers/mvc/src/Kendo.Mvc/UI')

                    generator.component(component)

                    generator.cs_proj(component)

                    component.register(component_register)
                end

                factory_file = 'wrappers/mvc/src/Kendo.Mvc/UI/WidgetFactory.cs'

                content = File.read(factory_file)

                content = content.sub(/\/\/>> MobileComponents(.|\n)*\/\/<< MobileComponents/,
                             "//>> MobileComponents #{component_register}//<< MobileComponents")

                File.write(factory_file, content.dos)
            end
        end

    end

    namespace :mvc_6 do
        desc 'Generate MVC v6 wrappers'
        task :wrappers do
            markdown = FileList[
                'docs/api/javascript/dataviz/ui/barcode.md',
                'docs/api/javascript/dataviz/ui/chart.md',
                'docs/api/javascript/dataviz/ui/lineargauge.md',
                'docs/api/javascript/dataviz/ui/radialgauge.md',
                'docs/api/javascript/dataviz/ui/qrcode.md',
                'docs/api/javascript/ui/button.md',
                'docs/api/javascript/ui/calendar.md',
                'docs/api/javascript/ui/colorpalette.md',
                'docs/api/javascript/ui/colorpicker.md',
                'docs/api/javascript/ui/contextmenu.md',
                'docs/api/javascript/ui/datepicker.md',
                'docs/api/javascript/ui/datetimepicker.md',
                'docs/api/javascript/ui/flatcolorpicker.md',
                'docs/api/javascript/ui/grid.md',
                'docs/api/javascript/ui/maskedtextbox.md',
                'docs/api/javascript/ui/notification.md',
                'docs/api/javascript/ui/numerictextbox.md',
                'docs/api/javascript/ui/progressbar.md',
                'docs/api/javascript/ui/rangeslider.md',
                'docs/api/javascript/ui/scheduler.md',
                'docs/api/javascript/ui/slider.md',
                'docs/api/javascript/ui/sortable.md',
                'docs/api/javascript/ui/timepicker.md',
                'docs/api/javascript/ui/treelist.md',
                'docs/api/javascript/ui/toolbar.md',
                'docs/api/javascript/ui/tooltip.md',
                'docs/api/javascript/ui/upload.md',
                'docs/api/javascript/ui/window.md',
                'docs/api/javascript/ui/splitter.md'
            ]

            components = markdown.map { |filename| CodeGen::MarkdownParser.read(filename, CodeGen::MVC6::Wrappers::Component) }
                .sort { |a, b| a.name <=> b.name }

            components.each do |component|
                import_metadata(component)
                import_metadata(component, "lib/mvc-6/config/")

                generator = CodeGen::MVC6::Wrappers::Generator.new('wrappers/mvc-6/src/Kendo.Mvc/UI')
                generator.component(component)
            end

            factory_file = 'wrappers/mvc-6/src/Kendo.Mvc/UI/WidgetFactory.cs'
        end
    end

    desc 'Generate PHP wrappers'
    task :php => ['php:wrappers']

    namespace :php do
        desc 'Generate PHP classes'
        task :wrappers do
            components = CodeGen::MarkdownParser.all(CodeGen::PHP::Wrappers::Component)

            components.each do |component|

                import_metadata(component)

                generator = CodeGen::PHP::Wrappers::Generator.new('wrappers/php/lib')

                generator.component(component)

            end
        end

        desc 'Generate PHP API reference'
        task :api do
            components = CodeGen::MarkdownParser.all(CodeGen::PHP::API::Component)

            components.each do |component|

                import_metadata(component)

                generator = CodeGen::PHP::API::Generator.new('docs/api/php/')

                generator.component(component)

            end
        end
    end

    desc 'Generate JSP wrappers'
    task :jsp => ['jsp:tld', 'jsp:wrappers']

    namespace :jsp do

        desc 'Generate JSP classes'
        task :wrappers do

            components = CodeGen::MarkdownParser.all(CodeGen::Java::JSP::Component)

            components.each do |component|

                import_metadata(component)

                generator = CodeGen::Java::JSP::Generator.new('wrappers/java/kendo-taglib/src/main/java/com/kendoui/taglib/')

                generator.component(component)

            end

        end

        desc 'Generate JSP API reference'
        task :api do

            components = CodeGen::MarkdownParser.all(CodeGen::Java::API::Component)

            components.each do |component|

                import_metadata(component)

                generator = CodeGen::Java::API::Generator.new('docs/api/jsp/')

                generator.component(component)

            end

        end

        desc 'Generate JSP TLD'
        task :tld do

            generator = CodeGen::Java::TLD::Generator.new('wrappers/java/kendo-taglib/src/main/resources/META-INF/taglib.tld')

            components = CodeGen::MarkdownParser.all(CodeGen::Java::TLD::Component)

            components.each do |component|

                import_metadata(component)

                generator.component(component)

            end

            generator.sync

        end
    end

end
