using Xunit;
using Kendo.Mvc.Tests;
using System.IO;
using System.Text.Encodings.Web;

namespace Kendo.Mvc.UI.Tests
{
    public class TabStripHtmlBuilderTests
    {
        private readonly TabStrip component;
        private TabStripItem item;
        private readonly TabStripHtmlBuilder builder;

        public TabStripHtmlBuilderTests()
        {
            component = new TabStrip(TestHelper.CreateViewContext());

            component.Name = "tabStrip1";

            item = new TabStripItem();
            item.Visible = true;

            builder = new TabStripHtmlBuilder(component);
        }

        [Fact]
        public void TabStripStart_should_render_div_wrapper()
        {
            IHtmlNode tag = builder.TabStripTag();

            Assert.Equal("div", tag.TagName);
            Assert.Equal(component.Id, tag.Attribute("id"));
            Assert.Equal("k-widget k-tabstrip k-header", tag.Attribute("class"));
        }

        [Fact]
        public void ItemStart_should_render_ul_start_tag_and_class()
        {
            IHtmlNode tag = builder.TabStripTag().Children[0];
            Assert.Equal("ul", tag.TagName);
            Assert.Contains(UIPrimitives.ResetStyle, tag.Attribute("class"));
        }

        [Fact]
        public void Should_render_Item_class()
        {
            item.HtmlAttributes.Clear();

            IHtmlNode tag = builder.ItemTag(item);

            Assert.Contains(UIPrimitives.Item, tag.Attribute("class"));
        }

        [Fact]
        public void Should_render_ActiveState_class_if_the_item_is_active()
        {
            item.Selected = true;
            item.HtmlAttributes.Clear();

            IHtmlNode tag = builder.ItemTag(item);

            Assert.Contains(UIPrimitives.ActiveState, tag.Attribute("class"));
        }

        [Fact]
        public void Should_render_DisabledState_class_if_the_item_is_disabled()
        {
            item.Enabled = false;
            item.HtmlAttributes.Clear();

            IHtmlNode tag = builder.ItemTag(item);

            Assert.Contains(UIPrimitives.DisabledState, tag.Attribute("class"));
        }

        [Fact]
        public void Should_render_DefaultState_class_if_the_item_enabled_and_not_active()
        {
            item.HtmlAttributes.Clear();

            IHtmlNode tag = builder.ItemTag(item);

            Assert.Contains(UIPrimitives.DefaultState, tag.Attribute("class"));
        }

        [Fact]
        public void Should_render_Li_start_tag()
        {
            IHtmlNode tag = builder.ItemTag(item);
            Assert.Equal("li", tag.TagName);
        }

        [Fact]
        public void Should_render_Link_start_tag_with_Link_class()
        {
            IHtmlNode tag = builder.ItemInnerTag(item);
            Assert.Equal("span", tag.TagName);
            Assert.Equal(UIPrimitives.Link, tag.Attribute("class"));
        }

        [Fact]
        public void Should_render_link_with_generated_url_Content_is_not_null()
        {
            const string id = "id";

            item.Content = () => { };
            item.ContentHtmlAttributes["id"] = id;

            IHtmlNode tag = builder.ItemInnerTag(item);
            Assert.Equal("#id", tag.Attribute("href"));
        }

        [Fact]
        public void Should_render_encoded_text()
        {
            item.Text = "test";

            IHtmlNode tag = builder.ItemInnerTag(item).Children[0];

            var writer = new StringWriter();
            tag.WriteTo(writer, HtmlEncoder.Default);

            writer.ToString().ShouldEqual("test");
        }

        [Fact]
        public void Should_render_content_activeState_class_if_the_item_is_active()
        {
            const string url = "url";

            item.ContentUrl = url;
            item.Selected = true;
            item.ContentHtmlAttributes.Clear();

            IHtmlNode tag = builder.ItemContentTag(item);

            Assert.Contains(UIPrimitives.ActiveState.ToString(), tag.Attribute("class"));
            Assert.Equal("display:block", tag.Attribute("style"));
        }

        [Fact]
        public void Should_merge_style_with_contentHtmlAttributes()
        {
            item.Selected = true;
            item.ContentHtmlAttributes.Clear();

            item.ContentHtmlAttributes.Add("style", "height:200px");

            IHtmlNode tag = builder.ItemContentTag(item);

            Assert.Contains(UIPrimitives.ActiveState.ToString(), tag.Attribute("class"));
            Assert.Equal("height:200px;display:block", tag.Attribute("style"));
        }

        [Fact]
        public void Should_call_WriteImage()
        {
            const string url = "testUrl";

            item.ImageUrl = url;

            IHtmlNode tag = builder.ItemInnerTag(item).Children[0];

            Assert.Equal("img", tag.TagName);
        }

        [Fact]
        public void Should_call_WriteSprite()
        {
            const string sprite = "sprite";

            item.SpriteCssClasses = sprite;

            IHtmlNode tag = builder.ItemInnerTag(item).Children[0];

            Assert.Equal("span", tag.TagName);
        }
    }
}