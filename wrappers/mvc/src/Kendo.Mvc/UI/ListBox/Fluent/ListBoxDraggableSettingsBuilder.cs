namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the ListBoxDraggableSettings settings.
    /// </summary>
    public class ListBoxDraggableSettingsBuilder: IHideObjectMembers
    {
        private readonly ListBoxDraggableSettings container;

        public ListBoxDraggableSettingsBuilder(ListBoxDraggableSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Provides a way for customization of the ListBox item placeholder. If a function is supplied, it receives one argument - the draggable element's jQuery object.
		/// If placeholder function is not provided the widget will clone dragged item, remove its ID attribute, set its visibility to hidden and use it as a placeholder.
        /// </summary>
        /// <param name="value">The value that configures the placeholder.</param>
        public ListBoxDraggableSettingsBuilder Placeholder(string value)
        {
            container.Placeholder = value;

            return this;
        }
        
        //<< Fields
    }
}

