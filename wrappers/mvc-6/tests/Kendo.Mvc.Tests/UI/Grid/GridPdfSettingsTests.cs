namespace Kendo.Mvc.UI.Tests
{
	using Xunit;

	public class GridPdfSettingsTests
    {
        private readonly GridPdfSettings<object> pdf;

        public GridPdfSettingsTests()
        {
            pdf = new GridPdfSettings<object>();
        }

        [Fact]
        public void Serializes_forceProxy()
        {
            pdf.ForceProxy = true;
            pdf.Serialize()["forceProxy"].ShouldEqual(true);
        }

        [Fact]
        public void Does_not_serialize_default_forceProxy()
        {
            pdf.Serialize().ContainsKey("forceProxy").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_proxyURL()
        {
            pdf.ProxyURL = "foo";
            pdf.Serialize()["proxyURL"].ShouldEqual("foo");
        }

        [Fact]
        public void Does_not_serialize_default_proxyURL()
        {
            pdf.Serialize().ContainsKey("proxyURL").ShouldBeFalse();
        }
    }
}