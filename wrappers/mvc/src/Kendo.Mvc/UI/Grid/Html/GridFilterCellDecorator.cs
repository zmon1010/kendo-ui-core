namespace Kendo.Mvc.UI.Html
{
    public class GridFilterCellDecorator : IGridCellBuilderDecorator
    {
        private string filterMessage = "";
        private readonly bool filtered;

        public GridFilterCellDecorator(bool filtered)
        {
            this.filtered = filtered;
        }

        public GridFilterCellDecorator(bool filtered, string filterMessage) : this(filtered)
        {
            this.filterMessage = filterMessage;
        }

        public void Decorate(IHtmlNode td)
        {
            td.AddClass("k-filterable");

            var link = new HtmlElement("a")
                .AddClass("k-grid-filter")
                .Attribute("href", "javascript:void(0)")
                .ToggleClass("k-state-active", filtered);

            td.Children.Insert(0, link);

            new HtmlElement("span").AddClass("k-icon", "k-filter").Text(filterMessage).AppendTo(link);
        }
    }
}
