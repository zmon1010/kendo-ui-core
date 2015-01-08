using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Mvc.Rendering.Expressions;
using System;
using System.ComponentModel;
using System.Linq.Expressions;

namespace Kendo.Mvc.UI
{
    public class WidgetFactory<TModel> : WidgetFactory
    {
        public WidgetFactory(HtmlHelper<TModel> htmlHelper)
            : base(htmlHelper)
        {
            HtmlHelper = htmlHelper;
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public new HtmlHelper<TModel> HtmlHelper
        {
            get;
            set;
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

        protected ModelMetadata GetModelMetadata<TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            var metadata = ExpressionMetadataProvider.FromLambdaExpression(expression, HtmlHelper.ViewData, HtmlHelper.MetadataProvider);
            if (metadata == null)
            {
                var expressionName = GetExpressionName(expression);
                throw new InvalidOperationException("No model metadata: " + expressionName);
            }

            return metadata;
        }

        protected string GetExpressionName<TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            return ExpressionHelper.GetExpressionText(expression);
        }
    }
}