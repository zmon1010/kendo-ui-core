namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;

    /// <summary>
    /// Represents an item from Kendo TreeView for ASP.NET MVC
    /// </summary>
    public class TreeViewItem : NavigationItem<TreeViewItem>, INavigationItemContainer<TreeViewItem>, IHierarchicalItem
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TreeViewItem"/> class.
        /// </summary>
        public TreeViewItem()
        {
            this.Items = new LinkedObjectCollection<TreeViewItem>(this);
        }

        /// <summary>
        /// Gets the nested items collection of the item.
        /// </summary>
        public IList<TreeViewItem> Items
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the item ID.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Indicates whether the item is expanded.
        /// </summary>
        public bool Expanded { get; set; }

        /// <summary>
        /// Indicates whether the item has children.
        /// </summary>
        public bool HasChildren { get; set; }

        /// <summary>
        /// Indicates whether the item is checked or not.
        /// </summary>
        public bool Checked { get; set; }

        private void Serialize<T>(IDictionary<string, object> json, string field, T value, T defaultValue)
             where T : IComparable<T>
        {
            if ((value == null && defaultValue != null) || (value != null && value.CompareTo(defaultValue) != 0))
            {
                json[field] = value;
            }
        }

        private string ConvertUrl(string url, UrlHelper urlHelper)
        {
            if (urlHelper == null)
            {
                return url;
            }

            if (!string.IsNullOrEmpty(url))
            {
                return urlHelper.Content(url);
            }

            return url;
        }

        /// <summary>
        /// Serizlizes the item properties to IDictionary&lt;string, object&gt;.
        /// </summary>
        public IDictionary<string, object> Serialize(UrlHelper urlHelper)
        {
            var json = new Dictionary<string, object>();

            json["id"] = this.Id;
            json["text"] = this.Text;

            Serialize(json, "hasChildren", this.HasChildren, false);
            Serialize(json, "encoded", this.Encoded, true);
            Serialize(json, "expanded", this.Expanded, false);
            Serialize(json, "checked", this.Checked, false);
            Serialize(json, "selected", this.Selected, false);
            Serialize(json, "imageUrl", ConvertUrl(this.ImageUrl, urlHelper), null);
            Serialize(json, "url", ConvertUrl(this.Url, urlHelper), null);
            Serialize(json, "spriteCssClass", this.SpriteCssClasses, null);
            Serialize(json, "enabled", this.Enabled, true);

            if (Items.Count > 0)
            {
                json["items"] = from item in Items select item.Serialize(urlHelper);
            }

            return json;
        }
    }
}