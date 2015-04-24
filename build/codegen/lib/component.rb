require 'string'
require 'field'
require 'method'
require 'composite_option'
require 'array_option'
require 'option'
require 'event'

module CodeGen
    TYPES = ['Object',
             'Date',
             'Array',
             'String',
             'Number',
             'Boolean',
             'Function',
             'jQuery']

    class Component
        include Options

        attr_reader :full_name, :name, :options, :events, :methods, :class_methods, :fields

        def initialize(settings)
            @full_name = settings[:name]
            @base = settings[:base]
            @name = @full_name.split('.').last
            @options = []
            @events = []
            @fields = []
            @methods = []
            @class_methods = []
            @content = false
        end

        def method_class
            Method
        end

        def field_class
            Field
        end

        def api_link
            directory = 'web';

            directory = 'framework' if @full_name.start_with?('kendo.data.')
            directory = 'dataviz' if @full_name.start_with?('kendo.dataviz')

            "/api/#{directory}/#{name.downcase}"
        end

        def widget?
            @full_name.include?('.ui.')
        end

        def content?
            @content
        end

        def import(metadata)
            @content = metadata[:content]

            return unless metadata[:options]

            all_targets = all_options
            metadata[:options].each do |option|
                name = option[:name]
                if option[:merge]
                    if !name.instance_of? Regexp
                        name = /^#{Regexp.quote name}$/i
                    end

                    targets = all_targets.find_all { |o| o.full_name.sub(/^#{@name}\./i, '') =~ name }
                    raise "Unable to find target for merging: #{option[:name]}" if targets.empty?

                    targets.each do |target|
                        option.each { |key, value| target.send("#{key}=", value) unless key == :merge || key == :name }
                    end
                else
                    @options.delete_if { |o| o.name == name }
                    option[:remove_existing] = true
                    add_option(option)
                end
            end
        end

        def add_field(settings)
            settings[:owner] = self

            field = field_class.new(settings)

            @fields.push(field)

            field
        end

        def add_method(settings)
            settings[:owner] = self

            method = method_class.new(settings)

            @methods.push(method)

            method
        end

        def add_class_method(settings)
            settings[:owner] = self

            method = method_class.new(settings)

            @class_methods.push(method)

            method
        end

        def add_event(settings)
            settings[:owner] = self

            event = event_class.new(settings)

            @events.push(event)

            event
        end
    end

end #module CodeGen
