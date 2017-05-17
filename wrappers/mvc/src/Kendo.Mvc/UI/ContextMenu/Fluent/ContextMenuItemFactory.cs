namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo ContextMenu for ASP.NET MVC
    /// </summary>
    public class ContextMenuItemFactory : IHideObjectMembers
    {
        private readonly INavigationItemContainer<ContextMenuItem> container;
        private readonly ViewContext viewContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="ContextMenuItemFactory"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        /// <param name="viewContext">The view context.</param>
        public ContextMenuItemFactory(INavigationItemContainer<ContextMenuItem> container, ViewContext viewContext)
        {

            this.container = container;
            this.viewContext = viewContext;
        }

        /// <summary>
        /// Adds an item.
        /// </summary>
        public ContextMenuItemBuilder Add()
        {
            ContextMenuItem item = new ContextMenuItem();

            container.Items.Add(item);

            return new ContextMenuItemBuilder(item, viewContext);
        }
    }
}