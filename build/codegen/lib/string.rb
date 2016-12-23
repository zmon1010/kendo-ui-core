class String
    def camelize
        self[0].downcase + self[1..-1]
    end

    def pascalize
        self.sub(/^./) { |c| c.upcase }
    end

    def strip_namespace
        self.sub(/kendo.*ui\./, '').sub('kendo.data.', '')
    end

    def singular
        return self + 'Item' if end_with?('ies') || !end_with?('s') || self.match(/\s*Axis+\s*/)

        self.sub(/s$/, '')
    end

    def pluralize
        return self + 's'
    end

    def html_encode
        return self.gsub('&', '&amp;').gsub('<', '&lt;').gsub('>', '&gt;')
    end

    def underscore
        self.gsub(/::/, '/')
        .gsub(/([A-Z]+)([A-Z][a-z])/,'\1_\2')
        .gsub(/([a-z\d])([A-Z])/,'\1_\2')
        .tr("-", "_")
        .downcase
    end

    def kebab
        self.underscore.gsub('_', '-')
    end

    def dos
        new_line = RUBY_PLATFORM =~ /w32/ ? "\n" : "\r\n"
        self.gsub(/\r?\n/, new_line)
    end

    def to_attribute
        self.gsub(/[A-Z]/, '-\0').downcase
    end

    def to_csharp_name()
        CSHARP_NAME_MAP[self] || self.slice(0,1).capitalize + self.slice(1..-1)
    end
end

