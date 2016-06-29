using System;

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
    }
}

