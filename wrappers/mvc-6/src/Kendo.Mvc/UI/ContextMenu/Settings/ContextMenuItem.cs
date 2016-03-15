using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc.Rendering;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ContextMenuItem class
    /// </summary>
    public partial class ContextMenuItem : NavigationItem<ContextMenuItem>, INavigationItemContainer<ContextMenuItem>
    {
        public ContextMenuItem()
        {
            Items = new List<ContextMenuItem>();
        }

        public IList<ContextMenuItem> Items
        {
            get;
            private set;
        }

        public bool Separator { get; set; }

        public ContextMenu ContextMenu { get; set; }

        public override IDictionary<string, object> Serialize()
        {
            if (Separator)
            {
                HtmlAttributes.Add("class", "k-separator");
            }

            var json = base.Serialize();

            var items = Items.Select(c => c.Serialize());

            if (items.Any())
            {
                json["items"] = items;
            }

            return json;
        }

        internal bool IsCurrent(ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            return false;
            //throw new NotImplementedException();
        }
    }
}
