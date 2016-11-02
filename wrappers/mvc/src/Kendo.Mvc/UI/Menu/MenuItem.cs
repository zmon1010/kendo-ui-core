namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Represents an item from Kendo Menu for ASP.NET MVC
    /// </summary>
    public class MenuItem : NavigationItem<MenuItem>, INavigationItemContainer<MenuItem>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MenuItem"/> class.
        /// </summary>
        public MenuItem()
        {
            Items = new LinkedObjectCollection<MenuItem>(this);
        }

        /// <summary>
        /// The list of menu items.
        /// </summary>
        public IList<MenuItem> Items
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