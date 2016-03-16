using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartPaneFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartPaneFactory<SalesData> factory;

        public ChartPaneFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartPaneFactory<SalesData>(chart.Panes);
        }

        [Fact]
        public void Builder_should_add_pane_by_name()
        {
            var value = "value";

            factory.Add(value);

            chart.Panes[0].Name.ShouldBeSameAs(value);
        }

        [Fact]
        public void Adding_pane_by_name_should_return_builder()
        {
            var builder = factory.Add("value");

            builder.ShouldBeType(typeof(ChartPaneBuilder<SalesData>));
        }
    }
}