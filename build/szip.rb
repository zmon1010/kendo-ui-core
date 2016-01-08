require 'pathname'
require 'zip'

class SZipTask < ZipTask
    include Rake::DSL

    def execute(args=nil)
        dir = name.pathmap('%d/%n')
        rm_rf name, :verbose => false

        $stderr.puts("Creating #{name}") if VERBOSE

        file_name = Pathname.new(name).relative_path_from(Pathname.new(dir))
        sh "cd #{dir} && 7zr a #{file_name} ."
    end
end

def szip(*args, &block)
    SZipTask.define_task(*args, &block)
end
