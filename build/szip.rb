require 'zip'

class SZipTask < ZipTask
    include Rake::DSL

    def execute(args=nil)
        dir = name.pathmap('%d/%n')
        rm_rf name, :verbose => false

        $stderr.puts("Creating #{name}") if VERBOSE

        sh "7zr a #{name} #{dir}"
    end
end

def szip(*args, &block)
    SZipTask.define_task(*args, &block)
end
