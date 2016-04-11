using System;
using System.Collections;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI Menu
    /// </summary>
    public partial class MenuBuilder: WidgetBuilderBase<Menu, MenuBuilder>
        
    {
        public MenuBuilder(Menu component) : base(component)
        {
        }

        public MenuBuilder Animation(bool enable)
        {
            Component.Animation.Enabled = enable;

            return this;
        }

        public MenuBuilder Animation(Action<PopupAnimationBuilder> animationAction)
        {
            animationAction(new PopupAnimationBuilder(Component.Animation));

            return this;
        }

        /// <summary>
        /// Defines the items in the menu
        /// </summary>
        /// <param name="addAction">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder Items(Action<MenuItemFactory> addAction)
        {
            MenuItemFactory factory = new MenuItemFactory(Component, Component.ViewContext);

            addAction(factory);

            return this;
        }

        /// <summary>
        /// Specifies Menu opening direction.
        /// </summary>
        /// <param name="value">The desired direction.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .Direction("top")
        /// %&gt;
        /// </code>
        /// </example>
        public MenuBuilder Direction(string value)
        {
            Component.Direction = value;

            return this;
        }

        public MenuBuilder Direction(MenuDirection value)
        {
            Component.Direction = value.ToString().ToLower();

            return this;
        }

        public MenuBuilder BindTo(IEnumerable<MenuItem> items)
        {
            Component.Items.Clear();

            foreach (MenuItem item in items)
            {
                Component.Items.Add(item);
            }

            return this;
        }

        public MenuBuilder ItemAction(Action<MenuItem> action)
        {
            Component.ItemAction = action;

            return this;
        }

        public MenuBuilder HighlightPath(bool value)
        {
            Component.HighlightPath = value;

            return this;
        }

        //public MenuBuilder SecurityTrimming(bool value)
        //{
        //    Component.SecurityTrimming.Enabled = value;

        //    return this;
        //}

        //public MenuBuilder SecurityTrimming(Action<SecurityTrimmingBuilder> securityTrimmingAction)
        //{
        //    securityTrimmingAction(new SecurityTrimmingBuilder(Component.SecurityTrimming));

        //    return this;
        //}
    }
}

