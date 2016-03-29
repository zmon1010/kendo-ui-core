using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kendo.Mvc.UI
{
    public partial class MenuItem : NavigationItem<MenuItem>, INavigationItemContainer<MenuItem>
    {
        public MenuItem()
        {
            Items = new List<MenuItem>();
        }

        public IList<MenuItem> Items
        {
            get;
            private set;
        }

        public bool Separator { get; set; }

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
    }
}
