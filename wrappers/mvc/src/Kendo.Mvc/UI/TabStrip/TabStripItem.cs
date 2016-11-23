namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents an item from Kendo TabStrip for ASP.NET MVC
    /// </summary>
    public class TabStripItem : NavigationItem<TabStripItem>, IAsyncContentContainer
    {
        private string loadContentFromUrl;

		/// <summary>
		/// Initializes a new instance of the <see cref="TabStripItem"/> class.
		/// </summary>
		public TabStripItem()
        {
        }

		/// <summary>
		/// Gets or sets the Content URL of the item.
		/// </summary>
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
    }
}