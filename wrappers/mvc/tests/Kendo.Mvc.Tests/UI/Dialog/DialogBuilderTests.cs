namespace Kendo.Mvc.UI.Tests
{
    using System;
    using Fluent;
    using Xunit;

    public class DialogBuilderTests
    {
        private readonly DialogBuilder builder;
        private readonly Dialog component;

        public DialogBuilderTests()
        {
            component = DialogTestHelper.CreateDialog();
            builder = new DialogBuilder(component);
        }

        [Fact]
        public void ActionFactory_adds_Action()
        {
            builder.Actions(act => act.Add().Text("Action"));

            component.Actions.Count.ShouldEqual(1);
        }

        [Fact]
        public void Closable_sets_Closable_property()
        {
            const bool closable = true;

            builder.Closable(closable);

            component.Closable.ShouldEqual(closable);
        }

        [Fact]
        public void Content_sets_Content_property()
        {
            const string content = "content";

            builder.Content(content);

            component.Content.ShouldEqual(content);
        }

        [Fact]
        public void Height_sets_Height_property()
        {
            const double height = 200;

            builder.Height(height);

            component.Height.ShouldEqual(height);
        }

        [Fact]
        public void MaxHeight_sets_MaxHeight_property()
        {
            const double maxHeight = 200;

            builder.MaxHeight(maxHeight);

            component.MaxHeight.ShouldEqual(maxHeight);
        }

        [Fact]
        public void MaxWidth_sets_MaxWidth_property()
        {
            const double maxWidth = 200;

            builder.MaxWidth(maxWidth);

            component.MaxWidth.ShouldEqual(maxWidth);
        }

        [Fact]
        public void MessagesConfigurator_should_apply_changes()
        {
            const string closeMsg = "close_message";
            builder.Messages(msg => msg.Close(closeMsg));

            component.Messages.Close.ShouldEqual(closeMsg);
        }

        [Fact]
        public void MinHeight_sets_MinHeight_property()
        {
            const double minHeight = 200;

            builder.MinHeight(minHeight);

            component.MinHeight.ShouldEqual(minHeight);
        }

        [Fact]
        public void MinWidth_sets_MinWidth_property()
        {
            const double minWidth = 200;

            builder.MinWidth(minWidth);

            component.MinWidth.ShouldEqual(minWidth);
        }

        [Fact]
        public void Modal_sets_Modal_property()
        {
            const bool modal = true;

            builder.Modal(modal);

            component.Modal.ShouldEqual(modal);
        }

        [Fact]
        public void Title_sets_Title_property()
        {
            const string title = "title";

            builder.Title(title);

            component.Title.ShouldEqual(title);
        }

        [Fact]
        public void Visible_sets_Visible_property()
        {
            const bool visible = true;

            builder.Visible(visible);

            component.Visible.ShouldEqual(visible);
        }

        [Fact]
        public void Width_sets_Width_property()
        {
            const double width = 200;

            builder.Width(width);

            component.Width.ShouldEqual(width);
        }

        [Fact]
        public void Animation_sets_Animation_property()
        {
            const bool animation = true;

            builder.Animation(animation);

            component.Animation.Enabled.ShouldEqual(animation);
        }

        [Fact]
        public void Animation_sets_PopupAnimation_object()
        {
            builder.Animation(animation => animation.Enable(true));

            component.Animation.ShouldBeType(typeof(PopupAnimation));
            component.Animation.Enabled.ShouldEqual(true);
        }

        [Fact]
        public void EventsConfigurator_should_assign_handlers_to_events()
        {
            const string handler = "handler";
            builder.Events(events => events
                                        .Close(handler)
                                        .Hide(handler)
                                        .InitOpen(handler)
                                        .Open(handler)
                                        .Show(handler));

            DialogTestHelper.GetEventHandler(component, "close").ShouldEqual(handler);
            DialogTestHelper.GetEventHandler(component, "hide").ShouldEqual(handler);
            DialogTestHelper.GetEventHandler(component, "initOpen").ShouldEqual(handler);
            DialogTestHelper.GetEventHandler(component, "open").ShouldEqual(handler);
            DialogTestHelper.GetEventHandler(component, "show").ShouldEqual(handler);
        }
    }
}