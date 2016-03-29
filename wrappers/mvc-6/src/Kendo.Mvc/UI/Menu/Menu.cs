using Kendo.Mvc.Extensions;
using Kendo.Mvc.Infrastructure;
using Kendo.Mvc.Rendering;
using Microsoft.AspNet.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI Menu component
    /// </summary>
    public partial class Menu : WidgetBase, INavigationItemComponent<MenuItem>

    {
        public Menu(ViewContext viewContext) : base(viewContext)
        {
            Animation = new PopupAnimation();

            Items = new List<MenuItem>();

            CloseOnClick = true;
            HighlightPath = true;
            Orientation = MenuOrientation.Horizontal;
            SecurityTrimming = new SecurityTrimming();
        }

        public PopupAnimation Animation { get; private set; }

        public IList<MenuItem> Items { get; private set; }

        public Action<MenuItem> ItemAction { get; set; }

        public bool? HighlightPath { get; set; }

        public SecurityTrimming SecurityTrimming { get; set; }

        public INavigationItemAuthorization Authorization { get; private set; }

        public string Direction { get; set; }

        protected override void WriteHtml(TextWriter writer)
        {
            var test = new HtmlElement("ul");
            test.Children.Add(new HtmlElement("li"));
            test.InnerHtml.Append("asdf");

            var a = test.InnerHtml.ToString();
            //if (Items.Any())
            //{
            //    var tag = Generator.GenerateTag("ul", ViewContext, Id, Name, HtmlAttributes);

            //    //if (HighlightPath.Value)
            //    //{
            //    //    Items.Each(HighlightSelectedItem); //TODO check
            //    //}

            //    tag.WriteTo(writer, HtmlEncoder);
            //}

            test.WriteTo(writer, HtmlEncoder);

            //base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            var items = Items.Select(c => c.Serialize());
            settings["dataSource"] = items;

            var animation = Animation.ToJson();
            if (animation.Keys.Any())
            {
                settings["animation"] = animation["animation"];
            }

            if (Orientation.HasValue && Orientation != MenuOrientation.Horizontal)
            {
                settings["orientation"] = Orientation?.Serialize();
            }

            if (Direction.HasValue())
            {
                settings["direction"] = Direction;
            }

            if (OpenOnClick.HasValue && OpenOnClick.Value == true)
            {
                settings["openOnClick"] = true;
            }

            if (CloseOnClick.HasValue && CloseOnClick.Value == false)
            {
                settings["closeOnClick"] = false;
            }

            writer.Write(Initializer.Initialize(Selector, "Menu", settings));
        }
    }
}

