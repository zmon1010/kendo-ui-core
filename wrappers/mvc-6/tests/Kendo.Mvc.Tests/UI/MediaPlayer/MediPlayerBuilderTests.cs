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
        private readonly MediaPlayer<Video> component;
        private readonly MediaPlayerBuilder<Video> builder;

        public MediPlayerBuilderTests()
        {
            component = new MediaPlayer<Video>(TestHelper.CreateViewContext());
            builder = new MediaPlayerBuilder<Video>(component);
        }

        [Fact]
        public void Autobind_is_disabled_properly()
        {
            builder.AutoBind(false);

            component.AutoBind.ShouldEqual(false);
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

        [Fact]
        public void Playlist_is_enabled_properly()
        {
            builder.Playlist(true);

            component.Playlist.ShouldEqual(true);
        }

        [Fact]
        public void BindTo_sets_the_data_source()
        {
            IEnumerable<Video> videos = new[] { new Video() };
            builder.BindTo(videos);

            Assert.Same(videos, component.DataSource.Data);
        }

        [Fact]
        public void Shared_datasource_id_is_set_correctly()
        {
            builder.DataSource("DataSource1");
            component.DataSourceId.ShouldEqual("DataSource1");
        }

    }
}
