using System.Collections;

namespace Kendo.Mvc.UI.Fluent
{
    public partial class WidgetFactory<TModel>
    {
        /// <summary>
        /// Creates a new <see cref="Kendo.Mvc.UI.ListBox"/> bound to the specified data item type.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().ListBox&lt;Order&gt;()
        ///             .Name("ListBox")
        ///             .BindTo(Model)
        /// )
        /// </code>
        /// </example>      
        public virtual ListBoxBuilder ListBox()
        {
            return new ListBoxBuilder(new ListBox(HtmlHelper.ViewContext));
        }

        /// <summary>
        /// Creates a new <see cref="Kendo.Mvc.UI.ListBox"/> bound to the specified data source.
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().ListBox(Model)
        ///             .Name("ListBox")
        /// )
        /// </code>
        /// </example>
        public virtual ListBoxBuilder ListBox(IEnumerable dataSource)
        {
            var builder = ListBox();

            builder.Component.DataSource.Data = dataSource;

            return builder;
        }

        /// <summary>
        /// Creates a new <see cref="Kendo.Mvc.UI.ListBox"/> bound an item in ViewData.
        /// </summary>
        /// <param name="dataSourceViewDataKey">The data source view data key.</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().ListBox&lt;Order&gt;("orders")
        ///             .Name("ListBox")
        /// )
        /// </code>
        /// </example>
        public virtual ListBoxBuilder ListBox(string dataSourceViewDataKey)
        {
            var builder = ListBox();

            builder.Component.DataSource.Data = HtmlHelper.ViewContext.ViewData.Eval(dataSourceViewDataKey) as IEnumerable;

            return builder;
        }
    }
}