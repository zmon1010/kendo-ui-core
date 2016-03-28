using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kendo.Mvc.Extensions.Tests;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class StockChartSerializationTests
    {
        private readonly StockChart<object> chart;

        public StockChartSerializationTests()
        {
            chart = StockChartTestHelper.CreateStockChart<object>();
        }

        [Fact]
        public void Default_AxisDefaults_should_not_be_serialized()
        {
            chart.AssertSettings(settings =>
            {
                settings.ContainsKey("axisDefaults").ShouldBeFalse();
            });
        }

        [Fact]
        public void AxisDefaults_should_be_serialized()
        {
            chart.AxisDefaults.Color = "value";

            chart.AssertSettings(settings =>
            {
                settings.ContainsKey("axisDefaults").ShouldBeTrue();
            });
        }

        [Fact]
        public void Default_DateField_should_not_be_serialized()
        {
            chart.AssertSettings(settings =>
            {
                settings.ContainsKey("dateField").ShouldBeFalse();
            });
        }

        [Fact]
        public void DateField_should_be_serialized()
        {
            var value = "value";

            chart.DateField = value;

            chart.AssertSettings(settings =>
            {
                settings["dateField"] = value;
            });
        }

        [Fact]
        public void Default_Navigator_should_not_be_serialized()
        {
            chart.AssertSettings(settings =>
            {
                settings.ContainsKey("navigator").ShouldBeFalse();
            });
        }

        [Fact]
        public void Navigator_should_be_serialized()
        {
            var value = "value";

            chart.Navigator.DateField = value;

            chart.AssertSettings(settings =>
            {
                ((Dictionary<string, object>) settings["navigator"])["dateField"].ShouldEqual(value);
            });
        }
    }
}
