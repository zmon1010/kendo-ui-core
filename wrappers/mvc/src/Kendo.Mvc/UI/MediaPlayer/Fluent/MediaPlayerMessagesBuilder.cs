using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MediaPlayerMessagesSettings
    /// </summary>
    public class MediaPlayerMessagesBuilder
    {
        protected MediaPlayer Container
        {
            get;
            private set;
        }

        public MediaPlayerMessagesBuilder(MediaPlayer Container)
        {
            this.Container = Container;
        }

        /// <summary>
        /// Pause button tooltip message
        /// </summary>
        /// <param name="value">The value for Pause</param>
        public MediaPlayerMessagesBuilder Pause(string value)
        {
            Container.Messages.Pause = value;
            return this;
        }

        /// <summary>
        /// Play button tooltip message
        /// </summary>
        /// <param name="value">The value for Play</param>
        public MediaPlayerMessagesBuilder Play(string value)
        {
            Container.Messages.Play = value;
            return this;
        }

        /// <summary>
        /// Volume/Mute button tooltip message
        /// </summary>
        /// <param name="value">The value for Mute</param>
        public MediaPlayerMessagesBuilder Mute(string value)
        {
            Container.Messages.Mute = value;
            return this;
        }

        /// <summary>
        /// Volume slider button tooltip message
        /// </summary>
        /// <param name="value">The value for Volume</param>
        public MediaPlayerMessagesBuilder Volume(string value)
        {
            Container.Messages.Volume = value;
            return this;
        }

        /// <summary>
        /// Quality button tooltip message
        /// </summary>
        /// <param name="value">The value for Quality</param>
        public MediaPlayerMessagesBuilder Quality(string value)
        {
            Container.Messages.Quality = value;
            return this;
        }

        /// <summary>
        /// Fullscreen button tooltip message
        /// </summary>
        /// <param name="value">The value for Fullscreen</param>
        public MediaPlayerMessagesBuilder Fullscreen(string value)
        {
            Container.Messages.Fullscreen = value;
            return this;
        }

    }
}
