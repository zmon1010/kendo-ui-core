namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Represents an item from Kendo PanelBar for ASP.NET MVC
    /// </summary>
    public class PanelBarItem : NavigationItem<PanelBarItem>, INavigationItemContainer<PanelBarItem>, IAsyncContentContainer
    {
        private string loadContentFromUrl;

        public PanelBarItem()
        {
            Items = new LinkedObjectCollection<PanelBarItem>(this);
        }

        /// <summary>
        /// Gets or sets the item ID.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Indicates whether the item has children.
        /// </summary>
        public bool HasChildren { get; set; }

        public bool Expanded
        {
            get;
            set;
        }

        public string ContentUrl
        {
            get
            {
                return loadContentFromUrl;
            }
            set
            {
                loadContentFromUrl = value;
                ContentHtmlAttributes.Clear();
                Content = null;
            }
        }

        public IList<PanelBarItem> Items
        {
            get;
            private set;
        }
    }
}