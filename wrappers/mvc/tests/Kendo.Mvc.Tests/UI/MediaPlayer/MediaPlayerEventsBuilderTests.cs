using Kendo.Mvc.UI.Fluent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Kendo.Mvc.Tests.UI.MediaPlayer
{
    public class MediaPlayerEventsBuilderTests
    {
        private MediaPlayerEventBuilder builder;
        private Dictionary<string, object> clientEvents;
        public MediaPlayerEventsBuilderTests()
        {
            clientEvents = new Dictionary<string, object>();
            builder = new MediaPlayerEventBuilder(clientEvents);
        }

        [Fact]
        public void End_sets_handlerName_of_the_mediaplayer()
        {
            builder.End("end");

            var @event = clientEvents["end"] as ClientHandlerDescriptor;

            Assert.NotNull(@event);

            @event.HandlerName.ShouldEqual("end");
        }

        [Fact]
        public void Pause_sets_handlerName_of_the_mediaplayer()
        {
            builder.Pause("pause");

            var @event = clientEvents["pause"] as ClientHandlerDescriptor;

            Assert.NotNull(@event);

            @event.HandlerName.ShouldEqual("pause");
        }

        [Fact]
        public void Play_sets_handlerName_of_the_mediaplayer()
        {
            builder.Play("play");

            var @event = clientEvents["play"] as ClientHandlerDescriptor;

            Assert.NotNull(@event);

            @event.HandlerName.ShouldEqual("play");
        }

        [Fact]
        public void Ready_sets_handlerName_of_the_mediaplayer()
        {
            builder.Ready("ready");

            var @event = clientEvents["ready"] as ClientHandlerDescriptor;

            Assert.NotNull(@event);

            @event.HandlerName.ShouldEqual("ready");
        }

        [Fact]
        public void TimeChange_sets_handlerName_of_the_mediaplayer()
        {
            builder.TimeChange("timeChange");

            var @event = clientEvents["timeChange"] as ClientHandlerDescriptor;

            Assert.NotNull(@event);

            @event.HandlerName.ShouldEqual("timeChange");
        }

        [Fact]
        public void VolumeChange_sets_handlerName_of_the_mediaplayer()
        {
            builder.VolumeChange("volumeChange");

            var @event = clientEvents["volumeChange"] as ClientHandlerDescriptor;

            Assert.NotNull(@event);

            @event.HandlerName.ShouldEqual("volumeChange");
        }
    }
}
