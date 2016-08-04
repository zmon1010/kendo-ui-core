namespace Kendo.Mvc.UI.Tests
{
	using System;
	using Fluent;
	using Kendo.Mvc.Tests;
	using Xunit;

	public class DialogBuilderTests
    {
        private DialogBuilder builder;
        private Dialog component;

        public DialogBuilderTests()
        {
            component = new Dialog(TestHelper.CreateViewContext());
			builder = new DialogBuilder(component);
        }

        [Fact]
        public void Title_sets_Title_property()
        {
            const string title = "title";

            builder.Title(title);

            component.Title.ShouldEqual(title);
        }

        [Fact]
        public void Title_returns_builder()
        {
            builder.Title("title").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Content_sets_Content_property()
        {
            const string content = "content";

            builder.Content(content);

            component.Content.ShouldEqual(content);
        }

        [Fact]
        public void Content_returns_builder_object()
        {
            builder.Content("content").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Content_with_string_param_returns_builder_object()
        {
            builder.Content("<ul><li>something</li></ul>").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Width_sets_Width_property()
        {
            const int width = 400;

            builder.Width(width);

            component.Width.ShouldEqual(width);
        }

        [Fact]
        public void Width_returns_builder()
        {
            builder.Width(400).ShouldBeSameAs(builder);
        }

        [Fact]
        public void MinWidth_sets_MinWidth_property()
        {
            const int value = 200;

            builder.MinWidth(value);

            component.MinWidth.ShouldEqual(value);
        }

        [Fact]
        public void MinWidth_returns_builder()
        {
            builder.MinWidth(200).ShouldBeSameAs(builder);
        }

        [Fact]
        public void MaxWidth_sets_MaxWidth_property()
        {
            const int value = 200;

            builder.MaxWidth(value);

            component.MaxWidth.ShouldEqual(value);
        }

        [Fact]
        public void MaxWidth_returns_builder()
        {
            builder.MaxWidth(200).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Height_sets_Height_property()
        {
            const int height = 200;

            builder.Height(height);

            component.Height.ShouldEqual(height);
        }

        [Fact]
        public void Height_returns_builder()
        {
            builder.Height(200).ShouldBeSameAs(builder);
        }

        [Fact]
        public void MinHeight_sets_MinHeight_property()
        {
            const int value = 200;

            builder.MinHeight(value);

            component.MinHeight.ShouldEqual(value);
        }

        [Fact]
        public void MinHeight_returns_builder()
        {
            builder.MinHeight(200).ShouldBeSameAs(builder);
        }

        [Fact]
        public void MaxHeight_sets_MaxHeight_property()
        {
            const int value = 200;

            builder.MaxHeight(value);

            component.MaxHeight.ShouldEqual(value);
        }

        [Fact]
        public void MaxHeight_returns_builder()
        {
            builder.MaxHeight(200).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Visible_sets_Visible_property()
        {
            const bool visible = true;

            builder.Visible(visible);

            component.Visible.ShouldEqual(visible);
        }

        [Fact]
        public void Visible_returns_builder()
        {
            builder.Visible(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Modal_sets_Modal_property()
        {
            const bool modal = true;

            builder.Modal(modal);

            component.Modal.ShouldEqual(modal);
        }

        [Fact]
        public void Modal_returns_builder()
        {
            builder.Modal(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Closable_sets_Closable_property()
        {
            const bool value = true;

            builder.Closable(value);

            component.Closable.ShouldEqual(value);
        }

        [Fact]
        public void Closable_returns_builder()
        {
            builder.Closable(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Messages_sets_Messages_property()
        {
            const string value = "close";

            builder.Messages(msg => msg.Close(value));

            component.Messages.Close.ShouldEqual(value);
        }

        [Fact]
        public void Messages_returns_builder()
        {
            builder.Messages(msg => msg.Close("")).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Animation_sets_Animation_property()
        {
            builder.Animation(true);

            component.Animation.Enabled.ShouldBeTrue();
        }

        [Fact]
        public void Animation_returns_builder()
        {
            builder.Animation(true).ShouldBeSameAs(builder);
        }

    }
}