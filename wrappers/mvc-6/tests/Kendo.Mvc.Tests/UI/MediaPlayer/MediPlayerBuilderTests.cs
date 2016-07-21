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
            component = new MediaPlayer(TestHelper.CreateViewContext());
            builder = new MediaPlayerBuilder(component);
        }

        [Fact]
        public void AutoPlay_is_enabled_properly()
        {
            builder.AutoPlay(true);

            component.AutoPlay.ShouldEqual(true);
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
    }
}
