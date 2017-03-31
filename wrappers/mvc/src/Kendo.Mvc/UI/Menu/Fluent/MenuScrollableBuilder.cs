namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring Menu scrolling/>
    /// </summary>
    public class MenuScrollableBuilder : IHideObjectMembers
    {
        private readonly MenuScrollable settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="MenuScrollableBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public MenuScrollableBuilder(MenuScrollable settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Distance sets the scroll amount (in pixels) that the menu scrolls when the scroll buttons are hovered.
        /// Each such distance is animated and then another animation starts with the same distance.
        /// If clicking a scroll button, the menu scrolls with 2x the distance. Default value is 50.
        /// </summary>
        /// <param name="pixels">The scroll distance in pixels.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .Scrollable(s => s.Distance(200))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual MenuScrollableBuilder Distance(int pixels)
        {
            settings.Distance = pixels;
            settings.Enabled = true;

            return this;
        }
    }
}