namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Tests;
    using Xunit;

    public class ReadOnlyDataSourceBuilderTests
    {
        private readonly DataSource dataSource;
        private readonly ReadOnlyDataSourceBuilder builder;

        public ReadOnlyDataSourceBuilderTests()
        {
            dataSource = new DataSource();
            builder = new ReadOnlyDataSourceBuilder(dataSource, TestHelper.CreateViewContext(), new UrlGenerator());
        }

        [Fact]
        public void Custom_method_returns_correct_builder()
        {
            builder.Custom().ShouldBeType(typeof(ReadOnlyCustomDataSourceBuilder));
        }
    }
}
