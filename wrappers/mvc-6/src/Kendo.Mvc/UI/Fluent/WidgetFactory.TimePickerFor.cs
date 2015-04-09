using System;
using System.Linq.Expressions;

namespace Kendo.Mvc.UI.Fluent
{
    public partial class WidgetFactory<TModel>
    {

        /// <summary>
        /// Creates a new <see cref="TimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TimePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual TimePickerBuilder TimePickerFor(Expression<Func<TModel, Nullable<TimeSpan>>> expression)
        {
            var metadata = GetModelMetadata(expression);
            var rules = HtmlHelper.GetClientValidationRules(metadata, expression.Name);

            var widget = TimePicker()
                    .Expression(GetExpressionName(expression))
                    .Format(ExtractEditFormat(metadata.EditFormatString))
                    .Value(metadata.Model as TimeSpan?);           

            return widget;
        }

        /// <summary>
        /// Creates a new <see cref="TimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TimePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual TimePickerBuilder TimePickerFor(Expression<Func<TModel, DateTime>> expression)
        {
            return TimePickerOfTValueFor(expression);
        }

        /// <summary>
        /// Creates a new <see cref="TimePicker"/> bound to nullable model field
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().TimePickerFor(m => m.Property))
        /// </code>
        /// </example>
        public virtual TimePickerBuilder TimePickerFor(Expression<Func<TModel, Nullable<DateTime>>> expression)
        {
            return TimePickerOfTValueFor(expression);
        }

        /// <summary>
        /// Creates a new <see cref="TimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TimePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        private TimePickerBuilder TimePickerOfTValueFor<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            var metadata = GetModelMetadata(expression);
            var rules = HtmlHelper.GetClientValidationRules(metadata, expression.Name);

            var widget = TimePicker()
                    .Expression(GetExpressionName(expression))
                    .Format(ExtractEditFormat(metadata.EditFormatString))
                    .Value(metadata.Model as DateTime?);

            var min = GetRangeValidationParameter<DateTime>(rules, MinimumValidator);
            if (min.HasValue)
            {
                widget.Min(min.Value);
            }

            var max = GetRangeValidationParameter<DateTime>(rules, MaximumValidator);
            if (max.HasValue)
            {
                widget.Max(max.Value);
            }

            return widget;
        }

        public virtual TimePickerBuilder TimePickerFor(Expression<Func<TModel, TimeSpan>> expression)
        {
            var metadata = GetModelMetadata(expression);
            var rules = HtmlHelper.GetClientValidationRules(metadata, expression.Name);

            var widget = TimePicker()
                    .Expression(GetExpressionName(expression))
                    .Format(ExtractEditFormat(metadata.EditFormatString))
                    .Value(metadata.Model as TimeSpan?);

            var min = GetRangeValidationParameter<TimeSpan>(rules, MinimumValidator);
            if (min.HasValue)
            {
                widget.Min(new DateTime(min.Value.Ticks));
            }

            var max = GetRangeValidationParameter<TimeSpan>(rules, MaximumValidator);
            if (max.HasValue)
            {
                widget.Max(new DateTime(max.Value.Ticks));
            }

            return widget;
        }
    }
}
