using System;
using System.Collections;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI MediaPlayer
    /// </summary>
    public class MediaPlayerBuilder : WidgetBuilderBase<MediaPlayer, MediaPlayerBuilder>
    {
        public MediaPlayerBuilder(MediaPlayer component) : base(component)
        {
        }

        /// <summary>
        /// If set to true the widget will start playing the video\vidoes after initializing
        /// </summary>
        /// <param name="value">The value for AutoPlay</param>
        public MediaPlayerBuilder AutoPlay(bool value)
        {
            Component.AutoPlay = value;
            return this;
        }

        /// <summary>
        /// If set to true the widget will start playing the video\vidoes after initializing
        /// </summary>
        public MediaPlayerBuilder AutoPlay()
        {
            Component.AutoPlay = true;
            return this;
        }

        /// <summary>
        /// If set to true the widget will start playing the video\vidoes after initializing
        /// </summary>
        /// <param name="value">The value for AutoRepeat</param>
        public MediaPlayerBuilder AutoRepeat(bool value)
        {
            Component.AutoRepeat = value;
            return this;
        }

        /// <summary>
        /// If set to true the widget will start playing the video\vidoes after initializing
        /// </summary>
        public MediaPlayerBuilder AutoRepeat()
        {
            Component.AutoRepeat = true;
            return this;
        }

        /// <summary>
        /// If set to false the user will be prevented from seeking the video forward
        /// </summary>
        /// <param name="value">The value for ForwardSeek</param>
        public MediaPlayerBuilder ForwardSeek(bool value)
        {
            Component.ForwardSeek = value;
            return this;
        }

        /// <summary>
        /// If set to true the widget will enter in full-sreen mode
        /// </summary>
        /// <param name="value">The value for FullScreen</param>
        public MediaPlayerBuilder FullScreen(bool value)
        {
            Component.FullScreen = value;
            return this;
        }

        /// <summary>
        /// If set to true the widget will enter in full-sreen mode
        /// </summary>
        public MediaPlayerBuilder FullScreen()
        {
            Component.FullScreen = true;
            return this;
        }

        /// <summary>
        /// If set to true the video will be played without sound
        /// </summary>
        /// <param name="value">The value for Mute</param>
        public MediaPlayerBuilder Mute(bool value)
        {
            Component.Mute = value;
            return this;
        }

        /// <summary>
        /// If set to true the video will be played without sound
        /// </summary>
        public MediaPlayerBuilder Mute()
        {
            Component.Mute = true;
            return this;
        }

        /// <summary>
        /// A value between 0 and 100 that specifies the volume of the video
        /// </summary>
        /// <param name="value">The value for Volume</param>
        public MediaPlayerBuilder Volume(double value)
        {
            Component.Volume = value;
            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().MediaPlayer()
        ///       .Name("MediaPlayer")
        ///       .Events(events => events
        ///           .End("onEnd")
        ///       )
        /// )
        /// </code>
        /// </example>
        public MediaPlayerBuilder Events(Action<MediaPlayerEventBuilder> configurator)
        {
            configurator(new MediaPlayerEventBuilder(Component.Events));
            return this;
        }

        /// <summary>
        /// Specifies the object which holds the information about the media that will be played
        /// </summary>
        /// <param name="value">The value for Media</param>
        public MediaPlayerBuilder Media(Action<MediaPlayerMediaBuilder> configurator)
        {
            configurator(new MediaPlayerMediaBuilder(Component));
            return this;
        }
    }
}

