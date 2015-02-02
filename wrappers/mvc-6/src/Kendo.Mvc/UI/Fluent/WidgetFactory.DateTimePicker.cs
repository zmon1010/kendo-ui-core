namespace Kendo.Mvc.UI.Fluent
{
    public partial class WidgetFactory
    {
        /// <summary>
        /// Creates a new <see cref="DateTimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateTimePicker()
        ///             .Name("DateTimePicker")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual DateTimePickerBuilder DateTimePicker()
        {
            return new DateTimePickerBuilder(new DateTimePicker(HtmlHelper.ViewContext));
        }
    }
}