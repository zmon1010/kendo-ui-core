using System;
using System.Collections;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI MediaPlayer
    /// </summary>
    public class MediaPlayerBuilder<T> : WidgetBuilderBase<MediaPlayer<T>, MediaPlayerBuilder<T>>
        where T : class
    {
        public MediaPlayerBuilder(MediaPlayer<T> component) : base(component)
        {
        }

        public MediaPlayerBuilder<T> DataSource(string dataSourceId)
        {
            Component.DataSourceId = dataSourceId;
            return this;
        }

        public MediaPlayerBuilder<T> DataSource(Action<DataSourceBuilder<T>> configurator)
        {
            configurator(new DataSourceBuilder<T>(Component.DataSource, Component.ViewContext, Component.UrlGenerator));
            return this;
        }

        public MediaPlayerBuilder<T> BindTo(IEnumerable<T> dataSource)
        {
            Component.DataSource.Data = dataSource;
            return this;
        }

        public MediaPlayerBuilder<T> BindTo(IEnumerable dataSource)
        {
            Component.DataSource.Data = dataSource;
            return this;
        }

        /// <summary>
        /// If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
        /// data source is fired.
        /// </summary>
        /// <param name="value">The value for AutoBind</param>
        public MediaPlayerBuilder<T> AutoBind(bool value)
        {
            Component.AutoBind = value;
            return this;
        }

        /// <summary>
        /// If set to true the widget will start playing the video\vidoes after initializing
        /// </summary>
        /// <param name="value">The value for AutoPlay</param>
        public MediaPlayerBuilder<T> AutoPlay(bool value)
        {
            Component.AutoPlay = value;
            return this;
        }

        /// <summary>
        /// If set to true the widget will start playing the video\vidoes after initializing
        /// </summary>
        public MediaPlayerBuilder<T> AutoPlay()
        {
            Component.AutoPlay = true;
            return this;
        }

        /// <summary>
        /// If set to true the widget will start playing the video\vidoes after initializing
        /// </summary>
        /// <param name="value">The value for AutoRepeat</param>
        public MediaPlayerBuilder<T> AutoRepeat(bool value)
        {
            Component.AutoRepeat = value;
            return this;
        }

        /// <summary>
        /// If set to true the widget will start playing the video\vidoes after initializing
        /// </summary>
        public MediaPlayerBuilder<T> AutoRepeat()
        {
            Component.AutoRepeat = true;
            return this;
        }

        /// <summary>
        /// A value between 0 and 100 that specifies the volume of the video
        /// </summary>
        /// <param name="value">The value for Volume</param>
        public MediaPlayerBuilder<T> Volume(double value)
        {
            Component.Volume = value;
            return this;
        }

        /// <summary>
        /// If set to true the widget will enter in full-sreen mode
        /// </summary>
        /// <param name="value">The value for FullScreen</param>
        public MediaPlayerBuilder<T> FullScreen(bool value)
        {
            Component.FullScreen = value;
            return this;
        }

        /// <summary>
        /// If set to true the widget will enter in full-sreen mode
        /// </summary>
        public MediaPlayerBuilder<T> FullScreen()
        {
            Component.FullScreen = true;
            return this;
        }

        /// <summary>
        /// If set to true the video will be played without sound
        /// </summary>
        /// <param name="value">The value for Mute</param>
        public MediaPlayerBuilder<T> Mute(bool value)
        {
            Component.Mute = value;
            return this;
        }

        /// <summary>
        /// If set to true the video will be played without sound
        /// </summary>
        public MediaPlayerBuilder<T> Mute()
        {
            Component.Mute = true;
            return this;
        }

        /// <summary>
        /// If set to false the user will be prevented from seeking the video forward
        /// </summary>
        /// <param name="value">The value for ForwardSeek</param>
        public MediaPlayerBuilder<T> ForwardSeek(bool value)
        {
            Component.ForwardSeek = value;
            return this;
        }

        /// <summary>
        /// If set to true the fowr
        /// </summary>
        public MediaPlayerBuilder<T> ForwardSeek()
        {
            Component.ForwardSeek = true;
            return this;
        }

        /// <summary>
        /// If set to true a playlist for the videos inside the data source will be created
        /// </summary>
        /// <param name="value">The value for Playlist</param>
        public MediaPlayerBuilder<T> Playlist(bool value)
        {
            Component.Playlist = value;
            return this;
        }

        /// <summary>
        /// If set to true a playlist for the videos inside the data source will be created
        /// </summary>
        public MediaPlayerBuilder<T> Playlist()
        {
            Component.Playlist = true;
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
            configurator(new MediaPlayerEventBuilder(Component.Events));
            return this;
        }
    }
}

