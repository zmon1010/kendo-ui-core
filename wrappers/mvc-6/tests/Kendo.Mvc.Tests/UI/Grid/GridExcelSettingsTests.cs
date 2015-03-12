namespace Kendo.Mvc.UI.Tests
{
	using Kendo.Mvc.Tests;
	using Xunit;

	public class GridExcelSettingsTests
    {
        private readonly GridExcelSettings<Customer> excel;

        public GridExcelSettingsTests()
        {
            excel = new GridExcelSettings<Customer>();
        }

        [Fact]
        public void Serializes_forceProxy()
        {
            excel.ForceProxy = true;
            excel.Serialize()["forceProxy"].ShouldEqual(true);
        }

        [Fact]
        public void Does_not_serialize_default_forceProxy()
        {
            excel.Serialize().ContainsKey("forceProxy").ShouldBeFalse();
        }
    }
}