using System;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI MediaPlayer
    /// </summary>
    public partial class MediaPlayerBuilder<T>
        where T : class 
    {
        /// <summary>
        /// If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
		/// data source is fired.
        /// </summary>
        /// <param name="value">The value for AutoBind</param>
        public MediaPlayerBuilder<T> AutoBind(bool value)
        {
            Container.AutoBind = value;
            return this;
        }

        /// <summary>
        /// If set to true the widget will start playing the video\vidoes after initializing
        /// </summary>
        /// <param name="value">The value for AutoPlay</param>
        public MediaPlayerBuilder<T> AutoPlay(bool value)
        {
            Container.AutoPlay = value;
            return this;
        }

        /// <summary>
        /// If set to true the widget will start playing the video\vidoes after initializing
        /// </summary>
        public MediaPlayerBuilder<T> AutoPlay()
        {
            Container.AutoPlay = true;
            return this;
        }

        /// <summary>
        /// If set to true the widget will start playing the video\vidoes after initializing
        /// </summary>
        /// <param name="value">The value for AutoRepeat</param>
        public MediaPlayerBuilder<T> AutoRepeat(bool value)
        {
            Container.AutoRepeat = value;
            return this;
        }

        /// <summary>
        /// If set to true the widget will start playing the video\vidoes after initializing
        /// </summary>
        public MediaPlayerBuilder<T> AutoRepeat()
        {
            Container.AutoRepeat = true;
            return this;
        }

        /// <summary>
        /// A value between 0 and 100 that specifies the volume of the video
        /// </summary>
        /// <param name="value">The value for Volume</param>
        public MediaPlayerBuilder<T> Volume(double value)
        {
            Container.Volume = value;
            return this;
        }

        /// <summary>
        /// If set to true the widget will enter in full-sreen mode
        /// </summary>
        /// <param name="value">The value for FullScreen</param>
        public MediaPlayerBuilder<T> FullScreen(bool value)
        {
            Container.FullScreen = value;
            return this;
        }

        /// <summary>
        /// If set to true the widget will enter in full-sreen mode
        /// </summary>
        public MediaPlayerBuilder<T> FullScreen()
        {
            Container.FullScreen = true;
            return this;
        }

        /// <summary>
        /// If set to true the video will be played without sound
        /// </summary>
        /// <param name="value">The value for Mute</param>
        public MediaPlayerBuilder<T> Mute(bool value)
        {
            Container.Mute = value;
            return this;
        }

        /// <summary>
        /// If set to true the video will be played without sound
        /// </summary>
        public MediaPlayerBuilder<T> Mute()
        {
            Container.Mute = true;
            return this;
        }

        /// <summary>
        /// If set to false the user will be prevented from seeking the video forward
        /// </summary>
        /// <param name="value">The value for ForwardSeek</param>
        public MediaPlayerBuilder<T> ForwardSeek(bool value)
        {
            Container.ForwardSeek = value;
            return this;
        }

        /// <summary>
        /// If set to true a playlist for the videos inside the data source will be created
        /// </summary>
        /// <param name="value">The value for Playlist</param>
        public MediaPlayerBuilder<T> Playlist(bool value)
        {
            Container.Playlist = value;
            return this;
        }

        /// <summary>
        /// If set to true a playlist for the videos inside the data source will be created
        /// </summary>
        public MediaPlayerBuilder<T> Playlist()
        {
            Container.Playlist = true;
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
        public MediaPlayerBuilder<T> Events(Action<MediaPlayerEventBuilder> configurator)
        {
            configurator(new MediaPlayerEventBuilder(Container.Events));
            return this;
        }
        
    }
}

