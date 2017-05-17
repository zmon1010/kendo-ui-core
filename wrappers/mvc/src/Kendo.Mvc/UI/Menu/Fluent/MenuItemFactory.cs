namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Menu for ASP.NET MVC
    /// </summary>
    public class MenuItemFactory : IHideObjectMembers
    {
        private readonly INavigationItemContainer<MenuItem> container;
        private readonly ViewContext viewContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="MenuItemFactory"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        /// <param name="viewContext">The view context.</param>
        public MenuItemFactory(INavigationItemContainer<MenuItem> container, ViewContext viewContext)
        {

            this.container = container;
            this.viewContext = viewContext;
        }

        /// <summary>
        /// Adds an item.
        /// </summary>
        public MenuItemBuilder Add()
        {
            MenuItem item = new MenuItem();

            container.Items.Add(item);

            return new MenuItemBuilder(item, viewContext);
        }
    }
}