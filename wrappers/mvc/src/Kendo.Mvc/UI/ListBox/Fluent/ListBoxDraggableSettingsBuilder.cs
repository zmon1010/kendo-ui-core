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

        /// <summary>
        /// Provides a way for customization of the ListBox item placeholder. If a function is supplied, it receives one argument - the draggable element's jQuery object.
        /// If placeholder function is not provided the widget will clone dragged item, remove its ID attribute, set its visibility to hidden and use it as a placeholder.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will be evaluated.</param>
        public ListBoxDraggableSettingsBuilder Placeholder(string handler)
        {
            container.Placeholder = new ClientHandlerDescriptor { HandlerName = handler };
            return this;
        }

        /// <summary>
        /// Provides a way for customization of the ListBox item placeholder. If a function is supplied, it receives one argument - the draggable element's jQuery object.
		/// If placeholder function is not provided the widget will clone dragged item, remove its ID attribute, set its visibility to hidden and use it as a placeholder.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ListBoxDraggableSettingsBuilder Placeholder(Func<object, object> handler)
        {
            container.Placeholder = new ClientHandlerDescriptor { TemplateDelegate = handler };
            return this;
        }

        //>> Fields
        
        /// <summary>
        /// Provides a way for customization of the draggable item hint. If a function is supplied, it receives one argument - the draggable element's jQuery object.
		/// If hint is not provided the widget will clone dragged item and use it as a hint.
        /// </summary>
        /// <param name="value">The value that configures the hint.</param>
        public ListBoxDraggableSettingsBuilder Hint(string value)
        {
            container.Hint = value;

            return this;
        }
        
        //<< Fields
    }
}

