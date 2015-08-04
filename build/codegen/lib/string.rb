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

    def html_encode
        return self.gsub('&', '&amp;').gsub('<', '&lt;').gsub('>', '&gt;')
    end

    def dos

        new_line = RUBY_PLATFORM =~ /w32/ ? "\n" : "\r\n"

        self.gsub(/\r?\n/, new_line)

    end

    def to_attribute
        self.gsub(/[A-Z]/, '-\0').downcase
    end

    def to_csharp_name(map = nil)
        map ||= CSHARP_NAME_MAP

        result = map[self]

        if result
            return result["name"] if result.key?("name")
            return result
        end

        self.slice(0,1).capitalize + self.slice(1..-1)
    end
end

