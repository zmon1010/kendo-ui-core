using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartPaneBuilderTests
    {
        private readonly ChartPane<SalesData> pane;
        private readonly ChartPaneBuilder<SalesData> builder;

        public ChartPaneBuilderTests()
        {
            pane = new ChartPane<SalesData>();
            builder = new ChartPaneBuilder<SalesData>(pane);
        }

        [Fact]
        public void Builder_should_set_Title()
        {
            var value = "value";

            builder.Title(value);

            pane.Title.Text.ShouldEqual(value);
        }

        [Fact]
        public void Title_should_return_builder()
        {
            builder.Title("value").ShouldEqual(builder);
        }
    }
}