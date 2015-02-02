using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Mvc.Rendering.Expressions;
using System;
using System.ComponentModel;
using System.Linq.Expressions;
using System.Text.RegularExpressions;

namespace Kendo.Mvc.UI.Fluent
{
    public partial class WidgetFactory<TModel> : WidgetFactory
    {
        private static readonly Regex StringFormatExpression = new Regex(@"(?<=\{\d:)(.)*(?=\})", RegexOptions.Compiled);

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
