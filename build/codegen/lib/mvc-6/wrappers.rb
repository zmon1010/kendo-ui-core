module CodeGen::MVC6::Wrappers

    EVENT = ERB.new(File.read("build/codegen/lib/mvc-6/event-builder.erb"), 0, '%<>')

end
