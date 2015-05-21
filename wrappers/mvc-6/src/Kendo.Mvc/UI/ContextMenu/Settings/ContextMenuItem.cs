using System.Collections.Generic;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ContextMenuItem class
    /// </summary>
    public partial class ContextMenuItem : NavigationItem<ContextMenuItem>, INavigationItemContainer<ContextMenuItem>
    {
        public ContextMenuItem()
        {
            Items = new LinkedObjectCollection<ContextMenuItem>(this);
        }

        public IList<ContextMenuItem> Items
        {
            get;
            private set;
        }

        public bool Separator { get; set; }

        public ContextMenu ContextMenu { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            //if (Text?.HasValue() == true)
            //{
            //    settings["text"] = Text;
            //}

            //if (Url?.HasValue() == true)
            //{
            //    settings["url"] = Url;
            //}

            //if (ImageUrl?.HasValue() == true)
            //{
            //    settings["imageUrl"] = ImageUrl;
            //}

            //if (SpriteCssClasses?.HasValue() == true)
            //{
            //    settings["spriteCssClass"] = SpriteCssClasses;
            //}

            //if (Enabled)
            //{
            //    settings["enabled"] = Enabled;
            //}

            //if (Selected)
            //{
            //    settings["selected"] = Selected;
            //}

            return settings;
        }
    }
}
