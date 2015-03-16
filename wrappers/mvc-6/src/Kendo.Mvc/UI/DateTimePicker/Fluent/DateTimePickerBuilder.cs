using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI DateTimePicker
    /// </summary>
    public partial class DateTimePickerBuilder : WidgetBuilderBase<DateTimePicker, DateTimePickerBuilder>
    {
        public DateTimePickerBuilder(DateTimePicker component) : base(component)
        {
        }

		/// <summary>
		/// Use to enable or disable animation of the popup element.
		/// </summary>
		/// <param name="enable">The boolean value.</param>
		/// <example>
		/// <code lang="CS">
		/// @(Html.Kendo().DatePicker()
		///	           .Name("DatePicker")
		///	           .Animation(false) //toggle effect
		///	)
		/// </code>
		/// </example>
		public DateTimePickerBuilder Animation(bool enable)
		{
			Component.Animation.Enabled = enable;

			return this;
		}

		/// <summary>
		/// Configures the animation effects of the widget.
		/// </summary>
		/// <param name="animationAction">The action which configures the animation effects.</param>
		/// <example>
		/// <code lang="CS">
		/// @(Html.Kendo().DatePicker()
		///	           .Name("DatePicker")
		///	           .Animation(animation =>
		///	           {
		///		            animation.Open(open =>
		///		            {
		///		                open.SlideIn(SlideDirection.Down);
		///		            })
		///	           })
		///	)
		/// </code>
		/// </example>
		public DateTimePickerBuilder Animation(Action<PopupAnimationBuilder> animationAction)
		{

			animationAction(new PopupAnimationBuilder(Component.Animation));

			return this;
		}

		/// <summary>
		/// Sets the value of the picker input
		/// </summary>
		public DateTimePickerBuilder Value(string date)
        {
            DateTime result;

            if (DateTime.TryParse(date, out result))
            {
                Component.Value = result;
            }
            else
            {
                Component.Value = null;
            }

            return this;
        }

        /// <summary>
        /// Specifies the selected value.
        /// </summary>
        /// <param name="value">The value that configures the value.</param>
        public DateTimePickerBuilder Value(DateTime? value)
        {
            Component.Value = value;

            return this;
        }

		/// <summary>
		/// Enables or disables the picker.
		/// </summary>
		public DateTimePickerBuilder Enable(bool value)
		{
			Component.Enabled = value;

			return this;
		}
	}
}

