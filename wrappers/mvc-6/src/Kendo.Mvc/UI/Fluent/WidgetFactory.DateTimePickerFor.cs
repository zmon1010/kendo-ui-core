using System;
using System.Linq.Expressions;

namespace Kendo.Mvc.UI.Fluent
{
    public partial class WidgetFactory<TModel>
    {
        /// <summary>
        /// Creates a new <see cref="DateTimePicker"/> bound to model field
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().DateTimePickerFor(m => m.Property))
        /// </code>
        /// </example>
        public virtual DateTimePickerBuilder DateTimePickerFor(Expression<Func<TModel, DateTime>> expression)
        {
            return DateTimePickerOfTValueFor(expression);
        }

        /// <summary>
        /// Creates a new <see cref="DateTimePicker"/> bound to nullable model field
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().DateTimePickerFor(m => m.Property))
        /// </code>
        /// </example>
        public virtual DateTimePickerBuilder DateTimePickerFor(Expression<Func<TModel, Nullable<DateTime>>> expression)
        {
            return DateTimePickerOfTValueFor(expression);
        }

        private DateTimePickerBuilder DateTimePickerOfTValueFor<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            var metadata = GetModelMetadata(expression);
            var rules = HtmlHelper.GetClientValidationRules(metadata, expression.Name);

            var widget = DateTimePicker()
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

    }
}
