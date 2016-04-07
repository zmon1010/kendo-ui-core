using Xunit;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class SparklineRenderingTests
    {
        private readonly SparklineMock<object> chart;

        public SparklineRenderingTests()
        {
            chart = SparklineTestHelper.CreateSparklineMock<object>();
        }

        [Fact]
        public void Sparkline_should_be_rendered_as_span()
        {
            var html = chart.ToHtmlString();
            var expectedHtml = 
                "<span class=\"\" id=\"\" name=\"\"></span>" +
                "<script>jQuery(function(){jQuery(\"#SparklineMock\").kendoSparkline({});});</script>";

            html.ShouldEqual(expectedHtml);
        }
    }
}