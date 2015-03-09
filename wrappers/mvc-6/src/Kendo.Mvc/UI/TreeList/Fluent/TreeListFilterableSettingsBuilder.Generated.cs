using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListFilterableSettings
    /// </summary>
    public partial class TreeListFilterableSettingsBuilder<T>
        
    {
        /// <summary>
        /// If set to true the filter menu allows the user to input a second criteria.
        /// </summary>
        /// <param name="value">The value for Extra</param>
        public TreeListFilterableSettingsBuilder<T> Extra(bool value)
        {
            Container.Extra = value;
            return this;
        }


    }
}
