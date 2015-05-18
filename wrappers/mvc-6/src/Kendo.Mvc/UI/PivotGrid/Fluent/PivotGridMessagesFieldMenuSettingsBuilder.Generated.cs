using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring PivotGridMessagesFieldMenuSettings
    /// </summary>
    public partial class PivotGridMessagesFieldMenuSettingsBuilder<T>
        where T : class 
    {
        /// <summary>
        /// The text messages displayed in fields filter.
        /// </summary>
        /// <param name="value">The value for Info</param>
        public PivotGridMessagesFieldMenuSettingsBuilder<T> Info(string value)
        {
            Container.Info = value;
            return this;
        }

        /// <summary>
        /// The text message displayed for the menu item which performs ascending sort.
        /// </summary>
        /// <param name="value">The value for SortAscending</param>
        public PivotGridMessagesFieldMenuSettingsBuilder<T> SortAscending(string value)
        {
            Container.SortAscending = value;
            return this;
        }

        /// <summary>
        /// The text message displayed for the menu item which performs descending sort.
        /// </summary>
        /// <param name="value">The value for SortDescending</param>
        public PivotGridMessagesFieldMenuSettingsBuilder<T> SortDescending(string value)
        {
            Container.SortDescending = value;
            return this;
        }

        /// <summary>
        /// The text messages of the fields filter menu item.
        /// </summary>
        /// <param name="value">The value for FilterFields</param>
        public PivotGridMessagesFieldMenuSettingsBuilder<T> FilterFields(string value)
        {
            Container.FilterFields = value;
            return this;
        }

        /// <summary>
        /// The text messages of the filter button.
        /// </summary>
        /// <param name="value">The value for Filter</param>
        public PivotGridMessagesFieldMenuSettingsBuilder<T> Filter(string value)
        {
            Container.Filter = value;
            return this;
        }

        /// <summary>
        /// The text messages of the include menu item.
        /// </summary>
        /// <param name="value">The value for Include</param>
        public PivotGridMessagesFieldMenuSettingsBuilder<T> Include(string value)
        {
            Container.Include = value;
            return this;
        }

        /// <summary>
        /// The title of the include fields dialog.
        /// </summary>
        /// <param name="value">The value for Title</param>
        public PivotGridMessagesFieldMenuSettingsBuilder<T> Title(string value)
        {
            Container.Title = value;
            return this;
        }

        /// <summary>
        /// The text of the clear filter expressions button.
        /// </summary>
        /// <param name="value">The value for Clear</param>
        public PivotGridMessagesFieldMenuSettingsBuilder<T> Clear(string value)
        {
            Container.Clear = value;
            return this;
        }

        /// <summary>
        /// The text of the OK button in the include fields dialog.
        /// </summary>
        /// <param name="value">The value for Ok</param>
        public PivotGridMessagesFieldMenuSettingsBuilder<T> Ok(string value)
        {
            Container.Ok = value;
            return this;
        }

        /// <summary>
        /// The text of the cancel button in the include fields dialog.
        /// </summary>
        /// <param name="value">The value for Cancel</param>
        public PivotGridMessagesFieldMenuSettingsBuilder<T> Cancel(string value)
        {
            Container.Cancel = value;
            return this;
        }

        /// <summary>
        /// The text of the filter operators displayed in the filter menu.
        /// </summary>
        /// <param name="configurator">The configurator for the operators setting.</param>
        public PivotGridMessagesFieldMenuSettingsBuilder<T> Operators(Action<PivotGridMessagesFieldMenuOperatorsSettingsBuilder<T>> configurator)
        {

            Container.Operators.PivotGrid = Container.PivotGrid;
            configurator(new PivotGridMessagesFieldMenuOperatorsSettingsBuilder<T>(Container.Operators));

            return this;
        }

    }
}
