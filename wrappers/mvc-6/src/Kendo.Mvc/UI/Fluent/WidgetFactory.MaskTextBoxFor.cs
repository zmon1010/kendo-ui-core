using System;
using System.Linq.Expressions;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    public partial class WidgetFactory<TModel>
    {		
		public virtual MaskedTextBoxBuilder MaskedTextBoxFor<TProperty>(Expression<Func<TModel, TProperty>> expression)
		{
			var metadata = GetModelExplorer(expression);
			var rules = HtmlHelper.GetClientValidationRules(metadata, expression.Name);
			var model = metadata.Model;

			return MaskedTextBox()
					.Expression(GetExpressionName(expression))
					.Value(model != null && model.GetType().IsPredefinedType() ? Convert.ToString(model) : null);			
		}
	}
}