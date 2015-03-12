namespace Kendo.Mvc.UI.Html.Tests
{
	using Kendo.Mvc.UI.Fluent;
	using Xunit;

	public class GridPdfSettingsBuilderTests
    {
        private GridPdfSettingsBuilder<object> builder;
        private GridPdfSettings<object> pdf;

        public GridPdfSettingsBuilderTests()
        {
            pdf = new GridPdfSettings<object>();
            builder = new GridPdfSettingsBuilder<object>(pdf);
        }

        [Fact]
        public void ForceProxy_sets_forceProxy()
        {
            builder.ForceProxy(true);
            pdf.ForceProxy?.ShouldBeTrue();
        }

        [Fact]
        public void ForceProxy_returns_builder()
        {
            builder.ForceProxy(true).ShouldEqual(builder);
        }

        [Fact]
        public void ProxyURL_sets_ProxyURL()
        {
            builder.ProxyURL("Foo");
            pdf.ProxyURL.ShouldEqual("Foo");
        }

        [Fact]
        public void ProxyURL_returns_builder()
        {
            builder.ProxyURL("Foo").ShouldEqual(builder);
        }
    }
}
