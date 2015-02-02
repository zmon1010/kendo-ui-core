using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Mvc.Rendering.Expressions;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Text.RegularExpressions;

namespace Kendo.Mvc.UI.Fluent
{
    public partial class WidgetFactory<TModel> : WidgetFactory
    {
        private static readonly Regex StringFormatExpression = new Regex(@"(?<=\{\d:)(.)*(?=\})", RegexOptions.Compiled);
        private const string MinimumValidator = "min";
        private const string MaximumValidator = "max";

        public WidgetFactory(IHtmlHelper<TModel> htmlHelper)
            : base(htmlHelper)
        {
            HtmlHelper = htmlHelper;
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public new IHtmlHelper<TModel> HtmlHelper
        {
            get;
            set;
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

        private Nullable<TValue> GetRangeValidationParameter<TValue>(IEnumerable<ModelClientValidationRule> rules, string parameter) where TValue : struct
        {
            var clientValidationsRules = rules.OfType<ModelClientValidationRangeRule>()
                                              .Cast<ModelClientValidationRangeRule>();

            object value = null;
            if (clientValidationsRules.Any() && clientValidationsRules.First().ValidationParameters.TryGetValue(parameter, out value))
            {
                return (TValue)Convert.ChangeType(value, typeof(TValue));
            }

            return null;
        }

        private string ExtractEditFormat(string format)
        {
            if (string.IsNullOrEmpty(format))
            {
                return string.Empty;
            }

            return StringFormatExpression.Match(format).ToString();
        }
    }
}
