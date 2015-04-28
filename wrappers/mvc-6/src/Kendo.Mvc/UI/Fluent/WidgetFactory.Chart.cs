namespace Kendo.Mvc.UI.Fluent
{
    public partial class WidgetFactory<TModel>
    {
        public virtual ChartBuilder Chart()
        {
            return new ChartBuilder(new Chart(HtmlHelper.ViewContext));
        }
    }
}