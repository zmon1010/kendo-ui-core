using System;
using Xunit;
using Kendo.Mvc.Extensions.Tests;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartSerializationTests
    {
        private readonly Chart<SalesData> chart;

        public ChartSerializationTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
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
    }
}