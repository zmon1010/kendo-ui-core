namespace Kendo.Mvc.UI.Tests
{
    using System;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;
    using Kendo.Mvc.Tests;
    using UI;
    using System.Collections.Generic;
    public class MediaPlayerMediaBuilderTests
    {
        private readonly MediaPlayer component;
        private readonly MediaPlayerMediaBuilder builder;

        public MediaPlayerMediaBuilderTests()
        {
            component = MediaPlayerTestHelper.CreateMediaPlayer(null);
            builder = new MediaPlayerMediaBuilder(component);
        }

        [Fact]
        public void Title_is_set_properly()
        {
            builder.Title("Title1");

            Assert.Equal(component.Media.Title, "Title1");
        }

        [Fact]
        public void Source_is_set_properly()
        {
            builder.Source("Source1");
            Assert.Equal(component.Media.Source, "Source1");
        }
    }
}
