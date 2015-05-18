using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring PivotGridMessagesFieldMenuOperatorsSettings
    /// </summary>
    public partial class PivotGridMessagesFieldMenuOperatorsSettingsBuilder<T>
        where T : class 
    {
        /// <summary>
        /// The text of the "contains" filter operator.
        /// </summary>
        /// <param name="value">The value for Contains</param>
        public PivotGridMessagesFieldMenuOperatorsSettingsBuilder<T> Contains(string value)
        {
            Container.Contains = value;
            return this;
        }

        /// <summary>
        /// The text of the "Does not contain" filter operator.
        /// </summary>
        /// <param name="value">The value for Doesnotcontain</param>
        public PivotGridMessagesFieldMenuOperatorsSettingsBuilder<T> Doesnotcontain(string value)
        {
            Container.Doesnotcontain = value;
            return this;
        }

        /// <summary>
        /// The text of the "Starts with" filter operator.
        /// </summary>
        /// <param name="value">The value for Startswith</param>
        public PivotGridMessagesFieldMenuOperatorsSettingsBuilder<T> Startswith(string value)
        {
            Container.Startswith = value;
            return this;
        }

        /// <summary>
        /// The text of the "Ends with" filter operator.
        /// </summary>
        /// <param name="value">The value for Endswith</param>
        public PivotGridMessagesFieldMenuOperatorsSettingsBuilder<T> Endswith(string value)
        {
            Container.Endswith = value;
            return this;
        }

        /// <summary>
        /// The text of the "equal" filter operator.
        /// </summary>
        /// <param name="value">The value for Eq</param>
        public PivotGridMessagesFieldMenuOperatorsSettingsBuilder<T> Eq(string value)
        {
            Container.Eq = value;
            return this;
        }

        /// <summary>
        /// The text of the "not equal" filter operator.
        /// </summary>
        /// <param name="value">The value for Neq</param>
        public PivotGridMessagesFieldMenuOperatorsSettingsBuilder<T> Neq(string value)
        {
            Container.Neq = value;
            return this;
        }

    }
}
