using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    public partial class WidgetFactory<TModel>
    {
        /// <summary>
        /// Creates a new <see cref="Kendo.Mvc.UI.MediaPlayer{T}"/> bound to the specified data item type.
        /// </summary>
        /// <example>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <code lang="CS">
        ///  @(Html.Kendo().MediaPlayer&lt;Order&gt;()
        ///             .Name("MediaPlayer")
        ///             .BindTo(Model)
        /// )
        /// </code>
        /// </example>      
        public virtual MediaPlayerBuilder<T> MediaPlayer<T>() where T : class
        {
            return new MediaPlayerBuilder<T>(new MediaPlayer<T>(HtmlHelper.ViewContext));
        }

        /// <summary>
        /// Creates a new <see cref="Kendo.Mvc.UI.MediaPlayer{T}"/> bound to the specified data source.
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().MediaPlayer(Model)
        ///             .Name("MediaPlayer")
        /// )
        /// </code>
        /// </example>
        public virtual MediaPlayerBuilder<T> MediaPlayer<T>(IEnumerable<T> dataSource) where T : class
        {
            var builder = MediaPlayer<T>();

            builder.Component.DataSource.Data = dataSource;

            return builder;
        }

        /// <summary>
        /// Creates a new <see cref="Kendo.Mvc.UI.MediaPlayer{T}"/> bound an item in ViewData.
        /// </summary>
        /// <typeparam name="T">Type of the data item</typeparam>
        /// <param name="dataSourceViewDataKey">The data source view data key.</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().MediaPlayer&lt;Order&gt;("orders")
        ///             .Name("MediaPlayer")
        /// )
        /// </code>
        /// </example>
        public virtual MediaPlayerBuilder<T> MediaPlayer<T>(string dataSourceViewDataKey) where T : class
        {
            var builder = MediaPlayer<T>();

            builder.Component.DataSource.Data = HtmlHelper.ViewContext.ViewData.Eval(dataSourceViewDataKey) as IEnumerable<T>;

            return builder;
        }
    }
}