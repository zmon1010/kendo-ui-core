using System.Collections.Generic;
using Kendo.Mvc.Tests;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Moq;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class NavigatorDataSourceSerializationTests
    {        
        private readonly StockChart<object> chart;
        private readonly StockChartNavigatorSettings<object> settings;
        private readonly StockChartNavigatorSettingsBuilder<object> builder;        
        
        public NavigatorDataSourceSerializationTests()
        {
            var viewContext = TestHelper.CreateViewContext();
            chart = StockChartTestHelper.CreateStockChart<object>();
            settings = new StockChartNavigatorSettings<object>(chart, viewContext);
            builder = new StockChartNavigatorSettingsBuilder<object>(settings);
        }

        [Fact]
        public void Default_DataSource_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("dataSource").ShouldBeFalse();
        }

        [Fact]
        public void Setting_Url_should_serialize_DataSource()
        {
            var value = "value";

            settings.DataSource.Transport.Read.Url = value;
            
            ((Dictionary<string, object>)settings.Serialize()["dataSource"]).ShouldEqual(settings.DataSource.ToJson());
        }

        [Fact]
        public void Setting_Url_should_set_Read_Type_to_POST()
        {
            var value = "value";
            settings.DataSource.Transport.Read.Url = value;
            settings.DataSource.Transport.Read.Type = null;

            settings.Serialize();

            settings.DataSource.Transport.Read.Type.ShouldEqual("POST");
        }
    }
}
