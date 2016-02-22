using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MultiSelectVirtualSettings
    /// </summary>
    public partial class MultiSelectVirtualSettingsBuilder
        
    {
        /// <summary>
        /// Specifies the height of the virtual item. All items in the virtualized list must have the same height.
		/// If the developer does not specify one, the framework will automatically set itemHeight based on the current theme and font size.
        /// </summary>
        /// <param name="value">The value for ItemHeight</param>
        public MultiSelectVirtualSettingsBuilder ItemHeight(double value)
        {
            Container.ItemHeight = value;
            return this;
        }

        /// <summary>
        /// The valueMapper function is mandatory for the functionality of the virtualized widget.
		/// The widget calls the valueMapper function when the widget receives a value, that is not fetched from the remote server yet.
		/// The widget will pass the selected value(s) in the valueMapper function. In turn, the valueMapper implementation should return the respective data item(s) index/indices.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will be evaluated.</param>
        public MultiSelectVirtualSettingsBuilder ValueMapper(string handler)
        {
            Container.ValueMapper = new ClientHandlerDescriptor { HandlerName = handler };
            return this;
        }

        /// <summary>
        /// The valueMapper function is mandatory for the functionality of the virtualized widget.
		/// The widget calls the valueMapper function when the widget receives a value, that is not fetched from the remote server yet.
		/// The widget will pass the selected value(s) in the valueMapper function. In turn, the valueMapper implementation should return the respective data item(s) index/indices.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public MultiSelectVirtualSettingsBuilder ValueMapper(Func<object, object> handler)
        {
            Container.ValueMapper = new ClientHandlerDescriptor { TemplateDelegate = handler };
            return this;
        }
    }
}
