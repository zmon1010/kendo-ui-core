using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI NumericTextBox
    /// </summary>
    public partial class NumericTextBoxBuilder<T>
        where T : struct 
    {
        /// <summary>
        /// Specifies the culture info used by the widget.
        /// </summary>
        /// <param name="value">The value for Culture</param>
        public NumericTextBoxBuilder<T> Culture(string value)
        {
            Container.Culture = value;
            return this;
        }

        /// <summary>
        /// Specifies the number precision. If not set precision defined by current culture is used.
        /// </summary>
        /// <param name="value">The value for Decimals</param>
        public NumericTextBoxBuilder<T> Decimals(double value)
        {
            Container.Decimals = value;
            return this;
        }

        /// <summary>
        /// Specifies the text of the tooltip on the down arrow.
        /// </summary>
        /// <param name="value">The value for DownArrowText</param>
        public NumericTextBoxBuilder<T> DownArrowText(string value)
        {
            Container.DownArrowText = value;
            return this;
        }

        /// <summary>
        /// Specifies the format of the number. Any valid number format is allowed.
        /// </summary>
        /// <param name="value">The value for Format</param>
        public NumericTextBoxBuilder<T> Format(string value)
        {
            Container.Format = value;
            return this;
        }

        /// <summary>
        /// Specifies the largest value the user can enter.
        /// </summary>
        /// <param name="value">The value for Max</param>
        public NumericTextBoxBuilder<T> Max(T? value)
        {
            Container.Max = value;
            return this;
        }

        /// <summary>
        /// Specifies the smallest value the user can enter.
        /// </summary>
        /// <param name="value">The value for Min</param>
        public NumericTextBoxBuilder<T> Min(T? value)
        {
            Container.Min = value;
            return this;
        }

        /// <summary>
        /// The hint displayed by the widget when it is empty. Not set by default.
        /// </summary>
        /// <param name="value">The value for Placeholder</param>
        public NumericTextBoxBuilder<T> Placeholder(string value)
        {
            Container.Placeholder = value;
            return this;
        }

        /// <summary>
        /// Specifies whether the up and down spin buttons should be rendered
        /// </summary>
        /// <param name="value">The value for Spinners</param>
        public NumericTextBoxBuilder<T> Spinners(bool value)
        {
            Container.Spinners = value;
            return this;
        }

        /// <summary>
        /// Specifies the value used to increment or decrement widget value.
        /// </summary>
        /// <param name="value">The value for Step</param>
        public NumericTextBoxBuilder<T> Step(T? value)
        {
            Container.Step = value;
            return this;
        }

        /// <summary>
        /// Specifies the text of the tooltip on the up arrow.
        /// </summary>
        /// <param name="value">The value for UpArrowText</param>
        public NumericTextBoxBuilder<T> UpArrowText(string value)
        {
            Container.UpArrowText = value;
            return this;
        }

        /// <summary>
        /// Specifies the value of the NumericTextBox widget.
        /// </summary>
        /// <param name="value">The value for Value</param>
        public NumericTextBoxBuilder<T> Value(T? value)
        {
            Container.Value = value;
            return this;
        }

        /// <summary>
        /// Enables or disables the textbox
        /// </summary>
        /// <param name="value">The value for Enable</param>
        public NumericTextBoxBuilder<T> Enable(bool value)
        {
            Container.Enable = value;
            return this;
        }


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().NumericTextBox()
        ///       .Name("NumericTextBox")
        ///       .Events(events => events
        ///           .Change("onChange")
        ///       )
        /// )
        /// </code>
        /// </example>
        public NumericTextBoxBuilder<T> Events(Action<NumericTextBoxEventBuilder> configurator)
        {
            configurator(new NumericTextBoxEventBuilder(Container.Events));
            return this;
        }
        
    }
}

