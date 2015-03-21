#!/usr/bin/ruby

def read(filename)
    File.readlines(filename).map { |line| line.gsub(/\r?\n/, '') }
end

def matching(a,b)
    a.select { |line| b.include? line }
end

files = ARGV.each { |f| Dir.glob(f) }.flatten.sort

first = files.shift
duplicates = read(first)

files.each do |current|
    current_lines = read(current)

    duplicates = matching(duplicates, current_lines)
end

duplicates
    .compact
    .delete_if { |d| d =~ /^\s*$/ }
    .each { |d| puts d }
    #.map { |d| /(.*):/.match(d)[1] if d =~ /(.*):/ }

# puts "Number of duplicates: #{duplicates.count}"
