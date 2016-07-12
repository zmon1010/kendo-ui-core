using System;
using System.Collections;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI MediaPlayer
    /// </summary>
    public partial class MediaPlayerBuilder<T> : WidgetBuilderBase<MediaPlayer<T>, MediaPlayerBuilder<T>>
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
    }
}

