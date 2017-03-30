namespace Kendo.Mvc.UI.Fluent
{
    public partial class WidgetFactory<TModel>
    {
        /// <summary>
        /// Creates a new <see cref="DateInput"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateInput()
        ///             .Name("DateInput")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual DateInputBuilder DateInput()
        {
            return new DateInputBuilder(new DateInput(HtmlHelper.ViewContext));
        }
    }
}