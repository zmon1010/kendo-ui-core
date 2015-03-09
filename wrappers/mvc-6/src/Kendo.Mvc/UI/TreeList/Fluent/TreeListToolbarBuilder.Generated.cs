using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListToolbar
    /// </summary>
    public partial class TreeListToolbarBuilder<T>
        
    {
        /// <summary>
        /// The name of the toolbar command. Either a built-in ("create", "excel", "pdf") or custom. The name is reflected in one of the CSS classes, which is applied to the button - k-grid-name.
		/// This class can be used to get a reference to the button (after TreeList initialization) and attach click handlers.
        /// </summary>
        /// <param name="value">The value for Name</param>
        public TreeListToolbarBuilder<T> Name(string value)
        {
            Container.Name = value;
            return this;
        }

        /// <summary>
        /// The text displayed by the command button. If not set the name` option would be used as the button text instead.
        /// </summary>
        /// <param name="value">The value for Text</param>
        public TreeListToolbarBuilder<T> Text(string value)
        {
            Container.Text = value;
            return this;
        }


    }
}
