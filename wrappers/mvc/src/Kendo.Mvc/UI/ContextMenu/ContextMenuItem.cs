namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Represents an item from Kendo ContextMenu for ASP.NET MVC
    /// </summary>
    public class ContextMenuItem : NavigationItem<ContextMenuItem>, INavigationItemContainer<ContextMenuItem>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ContextMenuItem"/> class.
        /// </summary>
        public ContextMenuItem()
        {
            Items = new LinkedObjectCollection<ContextMenuItem>(this);
        }

        /// <summary>
        /// The list of items.
        /// </summary>
        public IList<ContextMenuItem> Items
        {
            get;
            private set;
        }

        /// <summary>
        /// Indicates whether the item is a separator.
        /// </summary>
        public bool Separator
        {
            get;
            set;
        }

    }
}