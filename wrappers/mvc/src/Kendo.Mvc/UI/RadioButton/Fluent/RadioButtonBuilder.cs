namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="RadioButton"/> component.
    /// </summary>
    public class RadioButtonBuilder : WidgetBuilderBase<RadioButton, RadioButtonBuilder>
    {
        public RadioButtonBuilder(RadioButton component)
            : base(component)
        { }

        /// <summary>
        /// Checkes or unchecks the radio button.
        /// </summary>
        /// <param name="isChecked">Indicates whether the radio button will be rendered checked</param>
        public RadioButtonBuilder Checked(bool isChecked)
        {
            Component.Checked = isChecked;

            return this;
        }

        /// <summary>
        /// Enables or disables the radio button.
        /// </summary>
        /// <param name="isEnabled"></param>
        public RadioButtonBuilder Enable(bool isEnabled)
        {
            Component.Enabled = isEnabled;

            return this;
        }

        /// <summary>
        /// Shown label
        /// </summary>
        /// <param name="text"></param>
        public RadioButtonBuilder Label(string text)
        {
            Component.Label = text;

            return this;
        }

        /// <summary>
        /// Sets the value of the radio button
        /// </summary>
        /// <param name="value"></param>
        public RadioButtonBuilder Value(object value)
        {
            Component.Value = value;

            return this;
        }
    }
}