module CodeGen::MVC6::Wrappers::ChartGenerator

    CHART_SERIES = YAML.load(File.read("build/codegen/lib/mvc-6/config/chart-series.yml"))
    CHART_SERIES_DEFAULTS_BUILDER = ERB.new(File.read("build/codegen/lib/mvc-6/templates/chart-series-defaults-builder.erb"), 0, '%<>')
    CHART_SERIES_DEFAULTS_SETTINGS = ERB.new(File.read("build/codegen/lib/mvc-6/templates/chart-series-defaults-settings.erb"), 0, '%<>')

    def generate_chart
        write_chart_series_defaults_builder
        write_chart_series_defaults_settings
    end

    def write_chart_series_defaults_settings
        filename = "#{@path}/Chart/Settings/ChartSeriesDefaultsSettings.Generated.cs"
        write_file(filename, CHART_SERIES_DEFAULTS_SETTINGS.result(binding))
    end

    def write_chart_series_defaults_builder
        filename = "#{@path}/Chart/Fluent/ChartSeriesDefaultsSettingsBuilder.Generated.cs"
        write_file(filename, CHART_SERIES_DEFAULTS_BUILDER.result(binding))
    end
end
