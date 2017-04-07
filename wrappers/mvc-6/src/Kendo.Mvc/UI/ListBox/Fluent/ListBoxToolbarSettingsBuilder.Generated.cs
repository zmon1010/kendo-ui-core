using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ListBoxToolbarSettings
    /// </summary>
    public partial class ListBoxToolbarSettingsBuilder
        
    {
        /// <summary>
        /// Represents the listbox toolbar positions.
        /// </summary>
        /// <param name="value">The value for Position</param>
        public ListBoxToolbarSettingsBuilder Position(ListBoxToolbarPosition value)
        {
            Container.Position = value;
            return this;
        }

    }
}
