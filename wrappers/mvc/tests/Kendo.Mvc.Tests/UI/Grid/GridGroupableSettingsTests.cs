namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using System.IO;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Moq;
    using Xunit;

    public class GridGroupableSettingsTests
    {
        [Fact]
        public void Should_serialize_showfooter()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Grouping.ShowFooter = true;

            var result = grid.Grouping.ToJson();
            result.ContainsKey("showFooter").ShouldBeTrue();
        }

        [Fact]
        public void Should_serialize_returns_true_if_enabled_is_true()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Grouping.Enabled = true;

            grid.Grouping.ShouldSerialize().ShouldBeTrue();
        }

        [Fact]
        public void Should_serialize_returns_true_if_showfooter_is_true()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Grouping.ShowFooter = true;

            grid.Grouping.ShouldSerialize().ShouldBeTrue();
        }

        [Fact]
        public void Should_serialize_returns_false_if_enabled_and_showfooter_are_false()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Grouping.Enabled = false;
            grid.Grouping.ShowFooter = false;

            grid.Grouping.ShouldSerialize().ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_enabled()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Grouping.Enabled = true;

            var result = grid.Grouping.ToJson();
            result.ContainsKey("enabled").ShouldBeTrue();
        }

        [Fact]
        public void Should_render_groupable_setting_when_showfooter_is_false_and_enabled_is_false()
        {
            var writer = new Mock<HtmlTextWriter>(TextWriter.Null);
            var grid = GridTestHelper.CreateGrid<Customer>(writer.Object);
            grid.DataSource.Type = DataSourceType.Ajax;

            var initializer = new Mock<IJavaScriptInitializer>();

            grid.Initializer = initializer.Object;

            grid.Grouping.Enabled = false;
            grid.Grouping.ShowFooter = true;

            grid.Render();

            initializer.Verify(x => x.Initialize(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.Is<IDictionary<string, object>>(options => options.ContainsKey("groupable"))
                )
            );
        }  
    }
}