namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Used for serializing <see cref="PanelBarItem"/> objects.
    /// </summary>
    public class PanelBarItemModel : IHierarchicalItem
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PanelBarItemModel"/> class.
        /// </summary>
        public PanelBarItemModel()
        {
            this.Enabled = true;
            this.Encoded = true;
            this.Items = new List<PanelBarItemModel>();
            this.HtmlAttributes = new Dictionary<string, string>();
            this.ImageHtmlAttributes = new Dictionary<string, string>();
            this.LinkHtmlAttributes = new Dictionary<string, string>();
        }

        /// <summary>
        /// Indicates whether the item is enabled.
        /// </summary>
        public bool Enabled { get; set; }

        /// <summary>
        /// Indicates whether the item is expanded.
        /// </summary>
        public bool Expanded { get; set; }

        /// <summary>
        /// Indicates whether the item is encoded.
        /// </summary>
        public bool Encoded { get; set; }

        /// <summary>
        /// Indicates whether the item is selected.
        /// </summary>
        public bool Selected { get; set; }

        /// <summary>
        /// Gets or sets the item text.
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        /// Gets or sets the item sprite CSS class.
        /// </summary>
        public string SpriteCssClass { get; set; }

        /// <summary>
        /// Gets or sets the item ID.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Gets or sets the URL that the item navigates to on click.
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// Gets or sets the item image URL.
        /// </summary>
        public string ImageUrl { get; set; }

        /// <summary>
        /// Indicates whether the item has children.
        /// </summary>
        public bool HasChildren { get; set; }

        /// <summary>
        /// Gets or sets the nested items collection of the item.
        /// </summary>
        public List<PanelBarItemModel> Items { get; set; }

        /// <summary>
        /// Gets or sets Dictionary of HTML attributes applied to the item.
        /// </summary>
        public IDictionary<string, string> HtmlAttributes { get; set; }

        /// <summary>
        /// Gets or sets Dictionary of HTML attributes applied to the image content of the item.
        /// </summary>
        public IDictionary<string, string> ImageHtmlAttributes { get; set; }

        /// <summary>
        /// Gets or sets Dictionary of HTML attributes applied to the link content of the item.
        /// </summary>
        public IDictionary<string, string> LinkHtmlAttributes { get; set; }
    }
}