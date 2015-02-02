using System;
using System.Linq.Expressions;

namespace Kendo.Mvc.UI.Fluent
{
    public partial class WidgetFactory<TModel>
    {
        /// <summary>
        /// Creates a new <see cref="DateTimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateTimePickerFor(m => m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual DateTimePickerBuilder DateTimePickerFor(Expression<Func<TModel, DateTime>> expression)
        {
            var metadata = GetModelMetadata(expression);
            //IEnumerable<ModelValidator> validators = metadata.GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            //HtmlHelper.GetClientValidationRules(metadata, )

            return DateTimePicker()
                    .Name(GetExpressionName(expression))
                    .ModelMetadata(metadata)
                    //.Format(ExtractEditFormat(metadata.EditFormatString))
                    .Value(metadata.Model as DateTime?);
                    //.Min(GetRangeValidationParameter<DateTime>(validators, minimumValidator) ?? Kendo.Mvc.UI.DateTimePicker.defaultMinDate)
                    //.Max(GetRangeValidationParameter<DateTime>(validators, maximumValidator) ?? Kendo.Mvc.UI.DateTimePicker.defaultMaxDate);
        }


        /// <summary>
        /// Creates a new <see cref="DateTimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateTimePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        //public virtual DateTimePickerBuilder DateTimePickerFor(Expression<Func<TModel, Nullable<DateTime>>> expression)
        //{
        //    var metadata = GetModelMetadata(expression);
        //    IEnumerable<ModelValidator> validators = metadata.GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

        //    return DateTimePicker()
        //            .Name(GetName(expression))
        //            .ModelMetadata(metadata)
        //            .Format(ExtractEditFormat(metadata.EditFormatString))
        //            .Value(metadata.Model as DateTime?)
        //            .Min(GetRangeValidationParameter<DateTime>(validators, minimumValidator) ?? Kendo.Mvc.UI.DateTimePicker.defaultMinDate)
        //            .Max(GetRangeValidationParameter<DateTime>(validators, maximumValidator) ?? Kendo.Mvc.UI.DateTimePicker.defaultMaxDate);
        //}
    }
}
