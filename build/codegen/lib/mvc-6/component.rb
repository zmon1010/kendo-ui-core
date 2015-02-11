require 'codegen/lib/mvc-6/options'
require 'codegen/lib/mvc-6/event'

module CodeGen::MVC6::Wrappers

    EVENT = ERB.new(File.read("build/codegen/lib/mvc-6/event-builder.erb"), 0, '%<>')

    class Component < CodeGen::Component
        include Options

        attr_accessor :files

        def initialize *args
            super

            @files = []
        end

        def path
            name
        end

        def csharp_class
            name
        end

        def event_class
            Event
        end

        def to_events(filename)
            @files.push(filename)

            EVENT.result(binding)
        end

        def enum_options
            enums = simple_options.select{ |o| !o.values.nil? }
            composite = composite_options.flat_map { |o| o.options }

            composite.each do |item|
                composite.push(*item.options) if item.composite?

                enums.push(item) if !item.values.nil?
            end

            enums
        end
    end

end
