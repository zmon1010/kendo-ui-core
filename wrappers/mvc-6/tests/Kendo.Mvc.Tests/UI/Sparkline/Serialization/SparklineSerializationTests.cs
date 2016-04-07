using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kendo.Mvc.Extensions.Tests;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class SparklineSerializationTests
    {
        private readonly Sparkline<object> chart;

        public SparklineSerializationTests()
        {
            chart = SparklineTestHelper.CreateSparkline<object>();
        }


        [Fact]
        public void Default_Data_should_not_be_serialized()
        {
            chart.AssertSettings(settings =>
            {
                settings.ContainsKey("data").ShouldBeFalse();
            });
        }

        [Fact]
        public void Data_should_be_serialized()
        {
            var value = new int[] { 1, 2, 3 };

            chart.SeriesData = value;

            chart.AssertSettings(settings =>
            {
                settings["data"].ShouldEqual(value);
            });
        }

        [Fact]
        public void Data_should_be_serialized_instead_of_DataSource()
        {
            var value = new int[] { 1, 2, 3 };

            chart.SeriesData = value;
            chart.DataSource.Transport.Read.Url = "url";

            chart.AssertSettings(settings =>
            {
                settings["data"].ShouldEqual(value);
                settings.ContainsKey("dataSource").ShouldBeFalse();
            });
        }

        [Fact]
        public void Default_Type_should_not_be_serialized()
        {
            chart.AssertSettings(settings =>
            {
                settings.ContainsKey("type").ShouldBeFalse();
            });
        }

        [Fact]
        public void Type_should_be_serialized()
        {
            chart.Type =  SparklineType.Pie;

            chart.AssertSettings(settings =>
            {
                settings["type"].ShouldEqual("pie");
            });
        }
    }
}
