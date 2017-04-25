using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ListBoxDraggableSettings
    /// </summary>
    public partial class ListBoxDraggableSettingsBuilder
        
    {
        /// <summary>
        /// Indicates whether dragging is enabled.
        /// </summary>
        /// <param name="value">The value for Enabled</param>
        public ListBoxDraggableSettingsBuilder Enabled(bool value)
        {
            Container.Enabled = value;
            return this;
        }

        /// <summary>
        /// Provides a way for customization of the draggable item hint. If a function is supplied, it receives one argument - the draggable element's jQuery object.
		/// If hint is not provided the widget will clone dragged item and use it as a hint.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will be evaluated.</param>
        public ListBoxDraggableSettingsBuilder Hint(string handler)
        {
            Container.Hint = new ClientHandlerDescriptor { HandlerName = handler };
            return this;
        }

        /// <summary>
        /// Provides a way for customization of the draggable item hint. If a function is supplied, it receives one argument - the draggable element's jQuery object.
		/// If hint is not provided the widget will clone dragged item and use it as a hint.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ListBoxDraggableSettingsBuilder Hint(Func<object, object> handler)
        {
            Container.Hint = new ClientHandlerDescriptor { TemplateDelegate = handler };
            return this;
        }
        /// <summary>
        /// Provides a way for customization of the ListBox item placeholder. If a function is supplied, it receives one argument - the draggable element's jQuery object.
		/// If placeholder is not provided the widget will clone dragged item, remove its ID attribute, set its visibility to hidden and use it as a placeholder.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will be evaluated.</param>
        public ListBoxDraggableSettingsBuilder Placeholder(string handler)
        {
            Container.Placeholder = new ClientHandlerDescriptor { HandlerName = handler };
            return this;
        }

        /// <summary>
        /// Provides a way for customization of the ListBox item placeholder. If a function is supplied, it receives one argument - the draggable element's jQuery object.
		/// If placeholder is not provided the widget will clone dragged item, remove its ID attribute, set its visibility to hidden and use it as a placeholder.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ListBoxDraggableSettingsBuilder Placeholder(Func<object, object> handler)
        {
            Container.Placeholder = new ClientHandlerDescriptor { TemplateDelegate = handler };
            return this;
        }
    }
}
