#!/usr/bin/ruby

require 'erb'

dir = File.dirname(__FILE__)
template = ERB.new(File.read(File.join(dir, 'variable-origins-default.erb')), 0, '%<>')

def read(filename)
    File.readlines(filename).map { |line| line.gsub(/\r?\n/, '') }
end

def parse(lines)
    var_dec = /@(.*):\s*(.*);/
    vars = {}
    lines.map { |line| var_dec.match(line) }.compact
        .each { |var| vars[var[1]] = var[2] }

    matches = true

    while matches
        matches = false
        vars.each { |var, value|
            match = /^@(.*)$/.match(value)

            if match
                matches = true
                vars[var] = vars[match[1]]
            end
        }
    end

    vars
end

COLOR_MAPS = {}

def function_map(color)
    COLOR_MAPS[color] = `
        lessc --modify-var='color=#{color}' generate-functions.less |
        grep 'process' |
        sed 's/process: //' |
        sort` unless COLOR_MAPS[color]

    COLOR_MAPS[color]
end

def approximate(vars, value)
end

THEME_VALUES = {}

files = ARGV.each { |f| Dir.glob(f) }.flatten.sort

# extract values from skins

files.each do |current|
    current_lines = read(current)

    basename = current.sub(/\.less/,'')

    values = THEME_VALUES[current] = parse(current_lines)

    themeName = /kendo\.(.*).less/.match(current)[1]

    File.open("#{basename}.new.less", "w") do |f|
      f.write template.result(binding)
    end
end

# define new colors based on extracted ones
