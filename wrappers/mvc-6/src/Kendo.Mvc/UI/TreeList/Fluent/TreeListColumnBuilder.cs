using Kendo.Mvc.Extensions;
using Kendo.Mvc.Resources;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Mvc.Rendering.Expressions;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListColumn
    /// </summary>
    public partial class TreeListColumnBuilder<T>
        
    {
        public TreeListColumnBuilder(TreeListColumn<T> container)
        {
            Container = container;
        }

        protected TreeListColumn<T> Container
        {
            get;
            private set;
        }

		/// <summary>
		/// Provides a way to specify a custom editing UI for the column. Use the container parameter to create the editing UI.
		/// </summary>
		/// <param name="value">The value that configures the editor.</param>
		public TreeListColumnBuilder<T> Editor(string value)
		{
			Container.Editor = value;

			return this;
		}

		/// <summary>
		/// The field to which the column is bound. The value of this field is displayed by the column during data binding.
		/// The field name should be a valid Javascript identifier and should contain no spaces, no special characters, and the first character should be a letter.
		/// </summary>
		/// <param name="expression">The expression that specifies the field, based on the bound model.</param>
		public TreeListColumnBuilder<T> Field<TValue>(Expression<Func<T, TValue>> expression)
		{
			if (typeof(T).IsPlainType() && !expression.IsBindable())
			{
				throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
			}

			Container.Field = expression.MemberWithoutInstance();

			if (typeof(T).IsPlainType())
			{
				var viewDataDictionary = new ViewDataDictionary<T>(Container.TreeList.ModelMetadataProvider, new ModelStateDictionary());
				var metadata = ExpressionMetadataProvider.FromLambdaExpression(expression, viewDataDictionary, Container.TreeList.ModelMetadataProvider);

				Container.Title = metadata.DisplayName;
				Container.Format = metadata.DisplayFormatString;
			}

			if (string.IsNullOrEmpty(Container.Title))
			{
				var asTitle = Container.Field.AsTitle();
				if (asTitle != Container.Field)
				{
					Container.Title = asTitle;
				}
			}

			return this;
		}
	}
}
