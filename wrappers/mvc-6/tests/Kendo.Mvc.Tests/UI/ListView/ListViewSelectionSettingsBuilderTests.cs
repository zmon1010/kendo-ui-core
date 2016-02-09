namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;

    public class ListViewSelectionSettingsBuilderTests
    {
        private readonly ListViewSelectableSettings<string> settings;
        private readonly ListViewSelectableSettingsBuilder<string> builder;

        public ListViewSelectionSettingsBuilderTests()
        {
            settings = new ListViewSelectableSettings<string>();
            builder = new ListViewSelectableSettingsBuilder<string>(settings);
        }

        [Fact]
        public void Initial_false_settings()
        {
            Assert.False((new ListViewSelectableSettings<string>()).Enabled);
        }

        [Fact]
        public void Builder_sets_true_settings()
        {
            builder.Enabled(true);
            Assert.True(settings.Enabled);
            Assert.Equal(ListViewSelectionMode.Single, settings.Mode);
        }

        [Fact]
        public void Mode_sets_mode_to_settings()
        {
            builder.Mode(ListViewSelectionMode.Multiple);
            Assert.Equal(ListViewSelectionMode.Multiple, settings.Mode);
        }
    }
}