module CodeGen::PHP
    MANUALLY_GENERATED = {
        'schema' => ['model'],
        'Button' => ['content'],
        'Editor' => ['content'],
        'Tooltip' => ['content'],
        'Window' => ['content'],
        'column' => ['columns']
    }

    MANUALLY_GENERATED_EVENTS = {
        'Scheduler' => ['add']
    }

    TYPES = {
        'Number' => 'float',
        'String' => 'string',
        'Boolean' => 'boolean',
        'Array' => 'array',
        'Function' => '\Kendo\JavaScriptFunction',
        'Date' => 'date'
    }

    KEYWORDS = [ '__halt_compiler', 'abstract', 'and', 'array', 'as', 'break', 'callable', 'case',
        'catch', 'class', 'clone', 'const', 'continue', 'declare', 'default', 'die', 'do', 'echo',
        'else', 'elseif', 'empty', 'enddeclare', 'endfor', 'endforeach', 'endif', 'endswitch', 'endwhile',
        'eval', 'exit', 'extends', 'final', 'for', 'foreach', 'function', 'global', 'goto', 'if', 'implements',
        'include', 'include_once', 'instanceof', 'insteadof', 'interface', 'isset', 'list', 'namespace', 'new',
        'or', 'print', 'private', 'protected', 'public', 'require', 'require_once', 'return', 'static', 'switch',
        'throw', 'trait', 'try', 'unset', 'use', 'var', 'while', 'xor'
     ]

    IGNORED = {
        'transport' => ['signalr'],
		'calendar' => ['disableDates'],
		'datepicker' => ['disableDates'],
		'datetimepicker' => ['disableDates'],
        'axisdefaults' => ['axisdefaults.']
    }

    def self.ignored?(component, option)
        option_name = option.name.downcase
        option_full_name = option.full_name.downcase
        ignored = IGNORED[component.downcase]

        ignored && ignored.any? do |ignore|
            option_name.start_with?(ignore.downcase) || option_full_name.start_with?(ignore)
        end
    end

    module Options
        def full_name
            name = @name

            if !@owner.nil?
                name = @owner.name + '.' + name
            end

            name
        end

        def php_name
            return "_#{name}" if KEYWORDS.include?(@name)

            @name
        end

        def path
            php_namespace.gsub('\\', '/')
        end

        def events
            result = @events

            if MANUALLY_GENERATED_EVENTS.has_key?(@name)
                result.delete_if { |o| MANUALLY_GENERATED_EVENTS[@name].include?(o.name) }
            end

            result
        end

        def unique_options
            composite = composite_options.map { |o| o.name }

            result = options.find_all {|o| o.composite? || !composite.include?(o.name) }

            if MANUALLY_GENERATED.has_key?(@name)
                result.delete_if { |o| MANUALLY_GENERATED[@name].include?(o.name) }
            end

            result
        end

        def delete_ignored
           @options.delete_if { |o| CodeGen::PHP.ignored?(@name, o) }

           composite_options.each { |o| o.delete_ignored }
        end
    end

    module ArrayItem
        def php_class
            super.sub(@owner.name.pascalize, '')
        end
    end
end
