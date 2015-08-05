module CodeGen

class CompositeOption
    include Options

    attr_reader :name, :description, :type, :options, :owner, :recursive, :default, :toggleable, :default, :primitive, :item_type

    def initialize(settings)
        @name = settings[:name]
        @description = settings[:description]
        @type = settings[:type]
        @owner = settings[:owner]
        @recursive = settings[:recursive]
        @options = []
        @content = settings[:content]
        @toggleable = settings[:toggleable]
        @default = settings[:default]
        @primitive = settings[:primitive]
        @item_type = settings[:item_type]
    end

    def content?
        @content
    end

    def composite?
        true
    end

    def to_composite
        self
    end

end

end # module CodeGen
