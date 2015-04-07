using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Kendo.Mvc.Infrastructure;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ContextMenu component
    /// </summary>
    public partial class ContextMenu : WidgetBase, INavigationItemComponent<ContextMenuItem>
    {
        internal bool isPathHighlighted;

        public ContextMenu(ViewContext viewContext)
            : base(viewContext)
        {
            Animation = new PopupAnimation();

            Items = new LinkedObjectCollection<ContextMenuItem>(null);

            CloseOnClick = true;
            HighlightPath = true;
            SecurityTrimming = new SecurityTrimming();
        }

        public PopupAnimation Animation { get; private set; }

        public bool? OpenOnClick { get; set; }

        public bool? HighlightPath { get; set; }

        public IUrlGenerator UrlGenerator { get; private set; }

        public INavigationItemAuthorization Authorization { get; private set; }

        public SecurityTrimming SecurityTrimming { get; set; }

        public Action<ContextMenuItem> ItemAction { get; set; }

        public IList<ContextMenuItem> Items { get; private set; }

        protected override void WriteHtml(TextWriter writer)
        {
            if (Items.Any())
            {
                var tag = Generator.GenerateTag("div", ViewContext, Id, Name, HtmlAttributes);

                if (HighlightPath.Value)
                {
                    Items.Each(HighlightSelectedItem); //TODO check
                }


            }
            
            base.WriteHtml(writer);
        }

        private void HighlightSelectedItem(ContextMenuItem item)
        {
            if (item.IsCurrent(ViewContext, UrlGenerator))
            {
                isPathHighlighted = true;

                item.Selected = item.Parent != null;

                do
                {
                    if (!item.Selected)
                    {
                        item.HtmlAttributes.AppendInValue("class", " ", "k-state-highlight");
                    }
                    item = item.Parent;
                }
                while (item != null);

                return;
            }
            item.Items.Each(HighlightSelectedItem);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            var animation = Animation.ToJson();
            if (animation.Keys.Any())
            {
                settings["animation"] = animation["animation"];
            }

            if (AlignToAnchor.Value)
            {
                settings["alignToAnchor"] = true;
            }

            if (Orientation.HasValue && Orientation != ContextMenuOrientation.Vertical)
            {
                settings["orientation"] = Orientation?.Serialize();
            }

            if (OpenOnClick.Value)
            {
                settings["openOnClick"] = true;
            }

            if (!CloseOnClick.Value)
            {
                settings["closeOnClick"] = false;
            }

            writer.Write(Initializer.Initialize(Selector, "ContextMenu", settings));
        }
    }
}

