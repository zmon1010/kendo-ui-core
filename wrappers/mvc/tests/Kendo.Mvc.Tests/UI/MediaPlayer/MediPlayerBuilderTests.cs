namespace Kendo.Mvc.UI.Tests
{

    using System;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;
    using Kendo.Mvc.Tests;
    using UI;
    using System.Collections.Generic;

    public class MediPlayerBuilderTests
    {
        private readonly MediaPlayer component;
        private readonly MediaPlayerBuilder builder;

        public MediPlayerBuilderTests()
        {
            component = MediaPlayerTestHelper.CreateMediaPlayer(null);
            builder = new MediaPlayerBuilder(component);
        }

        [Fact]
        public void AutoRepeat_is_enabled_properly()
        {
            builder.AutoRepeat(true);

            component.AutoRepeat.ShouldEqual(true);
        }

        [Fact]
        public void FullScreen_is_enabled_properly()
        {
            builder.FullScreen(true);

            component.FullScreen.ShouldEqual(true);
        }

        [Fact]
        public void Mute_is_enabled_properly()
        {
            builder.Mute(true);

            component.Mute.ShouldEqual(true);
        }

        [Fact]
        public void Keyboard_navigation_is_enabled_properly()
        {
            builder.Navigatable(true);

            component.Navigatable.ShouldEqual(true);
        }
    }
}
