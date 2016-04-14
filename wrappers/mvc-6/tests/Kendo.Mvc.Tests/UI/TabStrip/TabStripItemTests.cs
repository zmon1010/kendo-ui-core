using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class TabStripItemTests
    {
        private readonly TabStripItem item;

        public TabStripItemTests()
        {
            item = new TabStripItem();
        }

        [Fact]
        public void HtmlAttributes_should_be_empty_when_new_instance_is_created()
        {
            Assert.Empty(item.HtmlAttributes);
        }

        [Fact]
        public void Should_be_able_to_set_selected()
        {
            item.Selected = true;

            Assert.True(item.Selected);
        }

        [Fact]
        public void Selected_should_reset_enable_to_true()
        {
            item.Enabled = false;

            item.Selected = true;

            Assert.True(item.Enabled);
        }

        [Fact]
        public void Should_be_able_to_set_enabled()
        {
            item.Enabled = true;

            Assert.True(item.Enabled);
        }

        [Fact]
        public void Disabled_should_reset_selected_to_false()
        {
            item.Selected = true;

            item.Enabled = false;

            Assert.False(item.Selected);
        }
    }
}