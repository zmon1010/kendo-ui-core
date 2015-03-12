namespace Kendo.Mvc.UI.Html.Tests
{
	using Kendo.Mvc.Tests;
	using Kendo.Mvc.UI.Fluent;
	using Xunit;

	public class GridExcelBuilderTests
    {
        private GridExcelSettingsBuilder<Customer> builder;
        private GridExcelSettings<Customer> excel;

        public GridExcelBuilderTests()
        {
            excel = new GridExcelSettings<Customer>();
            builder = new GridExcelSettingsBuilder<Customer>(excel);
        }
        
        [Fact]
        public void ForceProxy_sets_forceProxy()
        {
            builder.ForceProxy(true);
            excel.ForceProxy?.ShouldBeTrue();
        }

        [Fact]
        public void ForceProxy_returns_builder()
        {
            builder.ForceProxy(true).ShouldEqual(builder);
        }
    }
}
