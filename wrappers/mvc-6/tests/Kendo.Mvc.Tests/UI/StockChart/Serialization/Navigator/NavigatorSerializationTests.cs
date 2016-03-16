using System.Collections.Generic;
using Kendo.Mvc.Tests;
using Kendo.Mvc.UI;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class NavigatorSerializationTests
    {
        private readonly StockChart<object> chart;
        private readonly StockChartNavigatorSettings<object> settings;
        
        public NavigatorSerializationTests()
        {
            var viewContext = TestHelper.CreateViewContext();
            chart = StockChartTestHelper.CreateStockChart<object>();
            settings = new StockChartNavigatorSettings<object>(chart, viewContext);
        }

        [Fact]
        public void Default_DateField_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("dateField").ShouldBeFalse();
        }

        [Fact]
        public void DateField_should_be_serialized()
        {
            var value = "value";

            settings.DateField = value;

            settings.Serialize()["dateField"].ShouldBeSameAs(value);
        }

        [Fact]
        public void Default_Series_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("series").ShouldBeFalse();
        }

        [Fact]
        public void Series_should_be_serialized()
        {
            settings.Series.Add(new ChartSeries<object>() { Type = "area" });

            settings.Serialize().ContainsKey("series").ShouldBeTrue();
        }
    }
}
