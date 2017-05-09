using Kendo.Mvc.UI.Html;
using System.Collections.Generic;
using System.Web;

namespace Kendo.Mvc.UI.Grid.Html
{
    public class GridSelectHeaderCellBuilder : IGridCellBuilder
    {
        private readonly IDictionary<string, object> htmlAttributes;

        public GridSelectHeaderCellBuilder(IDictionary<string, object> htmlAttributes)
        {
            this.htmlAttributes = htmlAttributes;

            Decorators = new List<IGridCellBuilderDecorator>();
        }
        public ICollection<IGridCellBuilderDecorator> Decorators
        {
            get;
            private set;
        }

        public IHtmlNode CreateCell()
        {
            var th = new HtmlElement("th")
                    .Attribute("scope", "col")
                    .Attributes(htmlAttributes)
                    .PrependClass(UIPrimitives.Header);

            var checkbox = new HtmlElement("input")
                .AddClass("k-checkbox")
                .Attributes(new { type = "checkbox" })
                .Attribute("data-role", "checkbox")
                .Attribute("aria-checked", "false")
                .Attribute("aria-label", "Select all rows");
            checkbox.AppendTo(th);
            var label = new HtmlElement("label")
                .AddClass("k-checkbox-label")
                .Text(HttpUtility.HtmlDecode("&#8203;"));
            label.AppendTo(th);

            Decorate(th);

            return th;
        }

        protected void Decorate(IHtmlNode th)
        {
            foreach (var decorator in Decorators)
            {
                decorator.Decorate(th);
            }
        }
    }
}
