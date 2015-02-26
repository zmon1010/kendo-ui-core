namespace Kendo.Mvc.UI.Html.Tests
{
	using Kendo.Mvc.UI.Fluent;
	using Xunit;

	public class GridExcelBuilderTests
    {
        private GridExcelBuilder builder;
        private GridExcelSettings excel;

        public GridExcelBuilderTests()
        {
            excel = new GridExcelSettings();
            builder = new GridExcelBuilder(excel);
        }
        
        [Fact]
        public void ForceProxy_sets_forceProxy()
        {
            builder.ForceProxy(true);
            excel.ForceProxy.ShouldBeTrue();
        }

        [Fact]
        public void ForceProxy_returns_builder()
        {
            builder.ForceProxy(true).ShouldEqual(builder);
        }
    }
}
