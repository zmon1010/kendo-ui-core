using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI NumericTextBox
    /// </summary>
    public partial class NumericTextBoxBuilder<T>: WidgetBuilderBase<NumericTextBox<T>, NumericTextBoxBuilder<T>>
        where T : struct 
    {
        public NumericTextBoxBuilder(NumericTextBox<T> component) : base(component)
        {
        }

        /// <summary>
        /// Specifies the number precision applied to the widget value and when the NumericTextBox is focused. If not set, the precision defined by the current culture is used.Compare with the format property.
        /// </summary>
        /// <param name="value">The value for Decimals</param>
        public NumericTextBoxBuilder<T> Decimals(int value)
        {
            Container.Decimals = value;
            return this;
        }
    }
}

