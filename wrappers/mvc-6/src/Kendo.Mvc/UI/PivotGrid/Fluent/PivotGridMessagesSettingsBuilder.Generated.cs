using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring PivotGridMessagesSettings
    /// </summary>
    public partial class PivotGridMessagesSettingsBuilder<T>
        where T : class 
    {
        /// <summary>
        /// The text messages displayed in the measure fields sections.
        /// </summary>
        /// <param name="value">The value for MeasureFields</param>
        public PivotGridMessagesSettingsBuilder<T> MeasureFields(string value)
        {
            Container.MeasureFields = value;
            return this;
        }

        /// <summary>
        /// The text messages displayed in the column fields sections.
        /// </summary>
        /// <param name="value">The value for ColumnFields</param>
        public PivotGridMessagesSettingsBuilder<T> ColumnFields(string value)
        {
            Container.ColumnFields = value;
            return this;
        }

        /// <summary>
        /// The text messages displayed in the row fields sections.
        /// </summary>
        /// <param name="value">The value for RowFields</param>
        public PivotGridMessagesSettingsBuilder<T> RowFields(string value)
        {
            Container.RowFields = value;
            return this;
        }

        /// <summary>
        /// The text messages displayed in the field menu.
        /// </summary>
        /// <param name="configurator">The configurator for the fieldmenu setting.</param>
        public PivotGridMessagesSettingsBuilder<T> FieldMenu(Action<PivotGridMessagesFieldMenuSettingsBuilder<T>> configurator)
        {

            Container.FieldMenu.PivotGrid = Container.PivotGrid;
            configurator(new PivotGridMessagesFieldMenuSettingsBuilder<T>(Container.FieldMenu));

            return this;
        }

    }
}
