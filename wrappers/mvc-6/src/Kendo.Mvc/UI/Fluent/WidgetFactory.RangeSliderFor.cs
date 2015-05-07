using System;
using System.Linq.Expressions;

namespace Kendo.Mvc.UI.Fluent
{
    public partial class WidgetFactory<TModel>
    {
        public virtual RangeSliderBuilder<TValue> RangeSliderFor<TValue>(Expression<Func<TModel, TValue[]>> expression)
            where TValue : struct, IComparable
        {
            var metadata = GetModelMetadata(expression);
            var rules = HtmlHelper.GetClientValidationRules(metadata, expression.Name);

            TValue? minimum = GetRangeValidationParameter<TValue>(rules, MinimumValidator);
            TValue? maximum = GetRangeValidationParameter<TValue>(rules, MaximumValidator);

            var rangeSlider = RangeSlider<TValue>()
                                .Expression(GetExpressionName(expression))
                                .Values((TValue[])metadata.Model);

            if (minimum.HasValue)
            {
                rangeSlider.Min(minimum.Value);
            }

            if (maximum.HasValue)
            {
                rangeSlider.Max(maximum.Value);
            }

            return rangeSlider;
        }

        public virtual RangeSliderBuilder<double> RangeSliderFor(Expression<Func<TModel, double[]>> expression)
        {
            return RangeSliderFor<double>(expression);
        }
    }
}