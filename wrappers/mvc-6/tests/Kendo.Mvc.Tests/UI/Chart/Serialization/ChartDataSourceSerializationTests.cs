using System;
using Xunit;
using Kendo.Mvc.Extensions.Tests;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartDataSourceSerializationTests
    {
        private readonly Chart<SalesData> chart;

        public ChartDataSourceSerializationTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
        }

        [Fact]
        public void Default_dataSource_should_not_be_serialized()
        {
            chart.AssertSettings(settings =>
            {
                settings.ContainsKey("dataSource").ShouldBeFalse();
            });
        }

        [Fact]
        public void Setting_custom_type_to_dataSource_should_serialize_dataSource()
        {
            chart.Data = SalesDataBuilder.GetCollection();

            chart.DataSource.Type = DataSourceType.Custom;

            chart.AssertSettings(settings =>
            {
                settings["dataSource"] = chart.DataSource.ToJson();
            });
        }

        [Fact]
        public void DataSource_with_read_url_should_set_transport_read_type_to_post()
        {
            chart.DataSource.Transport.Read.Url = "url";

            chart.AssertSettings(settings =>
            {
                chart.DataSource.Transport.Read.Type.ShouldEqual("POST");
            });
        }

        [Fact]
        public void DataSource_with_read_url_should_set_dataSource_type_to_ajax()
        {
            chart.DataSource.Transport.Read.Url = "url";

            chart.AssertSettings(settings =>
            {
                chart.DataSource.Type.ShouldEqual(DataSourceType.Ajax);
            });
        }

        [Fact]
        public void Setting_dataSource_with_read_url_should_serialize_dataSource()
        {
            chart.DataSource.Transport.Read.Url = "url";

            chart.AssertSettings(settings =>
            {
                settings["dataSource"] = chart.DataSource.ToJson();
            });
        }

        [Fact]
        public void Setting_chart_data_should_not_serialize_dataSource_transport_settings()
        {
            chart.Data = SalesDataBuilder.GetCollection();

            chart.AssertSettings(settings =>
            {
                var dataSource = (IDictionary<string, object>) settings["dataSource"];
                dataSource.ContainsKey("transport").ShouldBeFalse();
            });
        }

        [Fact]
        public void Setting_chart_data_should_serialize_dataSource_data()
        {
            chart.Data = SalesDataBuilder.GetCollection();

            chart.AssertSettings(settings =>
            {
                var dataSource = (IDictionary<string, object>) settings["dataSource"];
                dataSource["data"].ShouldEqual(chart.Data);
            });
        }
    }
}