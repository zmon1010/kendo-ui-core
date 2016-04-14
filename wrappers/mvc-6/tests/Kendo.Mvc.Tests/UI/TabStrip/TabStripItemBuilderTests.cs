using Xunit;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class TabStripItemBuilderTests
    {
        private readonly TabStripItem item;
        private readonly TabStripItemBuilder builder;

        public TabStripItemBuilderTests()
        {
            item = new TabStripItem();
            builder = new TabStripItemBuilder(item, TestHelper.CreateViewContext());
        }

        [Fact]
        public void ToItem_should_return_internalitem()
        {
            Assert.Same(item, builder.ToItem());
        }

        [Fact]
        public void Should_be_able_to_set_html_attributes()
        {
            builder.HtmlAttributes(new { @class = "foo" });

            Assert.Equal("foo", item.HtmlAttributes["class"]);
        }

        [Fact]
        public void Should_be_able_to_set_text()
        {
            builder.Text("Test Tab Item");

            Assert.Equal("Test Tab Item", item.Text);
        }

        [Fact]
        public void LoadContentFrom_should_set_contentUrl_ofitem()
        {
            const string value = "test";

            builder.LoadContentFrom(value);

            Assert.Equal(value, item.ContentUrl);
        }

        [Fact]
        public void LoadContentFrom_should_return_TBuilder_object()
        {
            const string value = "test";

            var returnedBuilder = builder.LoadContentFrom(value);

            Assert.IsType(typeof(TabStripItemBuilder), returnedBuilder);
        }
    }
}