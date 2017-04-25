namespace Kendo.Mvc.UI.Html
{
    using Infrastructure;

    public class GridDetailRowBuilderDecorator : GridRowBuilderDecoratorBase
    {
        protected override void ApplyDecoration(IHtmlNode htmlNode)
        {
            var tagName = IsHeaderRow() ? "th" : "td";

            var td = new HtmlElement(tagName)
                .AddClass(UIPrimitives.Grid.HierarchyCell)
                .ToggleClass(UIPrimitives.Header, IsHeaderRow())
                .ToggleAttribute("scope","col", IsHeaderRow())
                .Html("&nbsp;");

            if ((CurrentGridItem.State & GridItemStates.Master) == GridItemStates.Master)
            {
                var ariaLabelText = CurrentGridItem.Expanded
                    ? "Collapse"
                    : "Expand";

                td.Html(string.Empty);
                var a = new HtmlElement("a")
                        .Attribute("href", "#")
                        .Attribute("aria-label", ariaLabelText)
                        .AddClass(UIPrimitives.Icon)
                        .ToggleClass("k-i-expand", !CurrentGridItem.Expanded)
                        .ToggleClass("k-i-collapse", CurrentGridItem.Expanded);

                a.AppendTo(td);
            }

            htmlNode.Children.Insert(CurrentGridItem.GroupLevel, td);
        }

        private bool IsHeaderRow()
        {
            return CurrentGridItem.Type == GridItemType.HeaderRow;
        }

        public override bool ShouldDecorate(GridItem gridItem)
        {
            return HasDetailView && gridItem.Type != GridItemType.EmptyRow && 
                   gridItem.Type != GridItemType.GroupRow;
        }
    }
}