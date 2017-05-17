namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo PanelBar for ASP.NET MVC
    /// </summary>
    public class PanelBarItemFactory : IHideObjectMembers
    {
        private readonly INavigationItemContainer<PanelBarItem> container;
        private readonly ViewContext viewContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="PanelBarItemFactory"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        /// <param name="viewContext">The view context.</param>
        public PanelBarItemFactory(INavigationItemContainer<PanelBarItem> container, ViewContext viewContext)
        {

            this.container = container;
            this.viewContext = viewContext;
        }

        /// <summary>
        /// Adds a new item to the PanelBar.
        /// </summary>
        public virtual PanelBarItemBuilder Add()
        {
            PanelBarItem item = new PanelBarItem();

            container.Items.Add(item);

            return new PanelBarItemBuilder(item, viewContext);
        }
    }
}