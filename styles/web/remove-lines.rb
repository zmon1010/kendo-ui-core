#!/usr/bin/ruby

def read(filename)
    File.readlines(filename).map { |line| line.gsub(/\r\n?/, '') }
end

files = ARGV.each { |f| Dir.glob(f) }.flatten.sort

removables = read(files.shift)

files.each do |current|
    current_lines = File.readlines(current).delete_if { |line| removables.include? line }

    puts "Removing lines from #{current}"

    File.open(current, 'w+') { |file| file.puts(current_lines) }
end
