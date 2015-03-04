namespace Kendo.Mvc.UI
{
	using System;
	using System.Collections.Generic;
	using System.ComponentModel.DataAnnotations;
	using System.Linq;
	using System.Linq.Expressions;
	using System.Reflection;
	using System.Text.RegularExpressions;
	using System.Threading;
	using Kendo.Mvc.Extensions;
	using Kendo.Mvc.Resources;
	using Microsoft.AspNet.Mvc;
	using Microsoft.AspNet.Mvc.ModelBinding;
	using Microsoft.AspNet.Mvc.Rendering.Expressions;

	public class GridBoundColumn<TModel, TValue> : GridColumnBase<TModel>, IGridBoundColumn/*, IGridTemplateColumn<TModel>*/ where TModel : class
    {
        private static readonly IDictionary<string, Func<TModel, TValue>> expressionCache = new Dictionary<string, Func<TModel, TValue>>();
        private static readonly ReaderWriterLockSlim syncLock = new ReaderWriterLockSlim();
        
        /// <summary>
        /// Initializes a new instance of the <see cref="GridBoundColumn{TModel, TValue}"/> class.
        /// </summary>
        /// <param name="grid"></param>
        /// <param name="expression"></param>
        public GridBoundColumn(Grid<TModel> grid, Expression<Func<TModel, TValue>> expression)
            : base(grid)
        {
            if (typeof(TModel).IsPlainType() && !expression.IsBindable())
            {
                throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
            }

            Expression = expression;
            Member = expression.MemberWithoutInstance();
            MemberType = expression.ToMemberExpression().Type();

            Func<TModel, TValue> value;
            var key = expression.ToString();

            using (syncLock.ReadAndWrite())
            {
                if (!expressionCache.TryGetValue(key, out value))
                {
                    using (syncLock.Write())
                    {
                        if (!expressionCache.TryGetValue(key, out value))
                        {
                            expressionCache[key] = value = expression.Compile();
                        }
                    }
                }
            }

            Value = value;        

            if (typeof(TModel).IsPlainType())
            {
				var viewDataDictionary = new ViewDataDictionary<TModel>(Grid.ModelMetadataProvider, new ModelStateDictionary());
				Metadata = ExpressionMetadataProvider.FromLambdaExpression(expression, viewDataDictionary, Grid.ModelMetadataProvider);

                MemberType = Metadata.ModelType;
                Title = Metadata.DisplayName;
                Format = Metadata.DisplayFormatString;
                Visible = Metadata.ShowForDisplay;
            }

            if (string.IsNullOrEmpty(Title))
            {
                Title = Member.AsTitle();
            }

            FilterableSettings = new GridBoundColumnFilterableSettings(Grid.ModelMetadataProvider);            
        }

        /// <summary>
        /// Gets type of the property to which the column is bound to.
        /// </summary>
        public Type MemberType
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether this column is groupable.
        /// </summary>
        /// <value><c>true</c> if groupable; otherwise, <c>false</c>.</value>
        public bool Groupable
        {
            get
            {
                return Settings.Groupable;
            }
            set
            {
                Settings.Groupable = value;
            }
        }

        public object AdditionalViewData
        {
            get;
            set;
        }

        public ModelMetadata Metadata
        {
            get;            
        }

        public string EditorTemplateName
        {
            get;
            set;
        }

        public string ClientGroupHeaderTemplate
        {
            get
            {
                return Settings.ClientGroupHeaderTemplate;
            }
            set
            {
                Settings.ClientGroupHeaderTemplate = value;
            }
        }

        /// <summary>
        /// Gets a function which returns the value of the property to which the column is bound to.
        /// </summary>
        public Func<TModel, TValue> Value
        {
            get;            
        }

        public Expression<Func<TModel, TValue>> Expression
        {
            get;            
        }

        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="GridColumnBase{T}"/> is sortable.
        /// </summary>
        /// <value><c>true</c> if sortable; otherwise, <c>false</c>. The default value is <c>true</c>.</value>
        public bool Sortable
        {
            get
            {
                return Settings.Sortable;
            }
            set
            {
                Settings.Sortable = value;
            }
        }

        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="GridColumnBase{T}"/> is filterable.
        /// </summary>
        /// <value><c>true</c> if filterable; otherwise, <c>false</c>. The default value is <c>true</c>.</value>
        public bool Filterable
        {
            get
            {
                return Settings.Filterable && FilterableSettings.Enabled;
            }

            set
            {
                Settings.Filterable = value;
                FilterableSettings.Enabled = value;
            }
        }

        public GridBoundColumnFilterableSettings FilterableSettings
        {
            get;
            set;
        }        

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);

            var aggregates = Grid.DataSource.Aggregates
                    .Where(agg => agg.Member == Member)
                    .SelectMany(agg => agg.Aggregates)
                    .Select(agg => agg.AggregateMethodName.ToLowerInvariant());

            json["field"] = Member;

            if (Format.HasValue())
            {
                json["format"] = Format;
            }

            if (!Groupable)
            {
                json["groupable"] = false;
            }

            if (!Sortable)
            {
                json["sortable"] = false;
            }

            if (!Filterable)
            {
                json["filterable"] = false;
            }
            else
            {
                json["filterable"] = FilterableSettings.ToJson();
            }            

            if (Encoded)
            {
                json["encoded"] = true;
            }

            if (aggregates.Any())
            {
                json["aggregates"] = aggregates;
            }

            string editorHtml = EditorHtml;

            if (Grid.IsInClientTemplate && editorHtml != null)
            {                
                editorHtml = Regex.Replace(editorHtml.Trim(), "(&amp;)#([0-9]+;)", "$1\\#$2")
                                .Replace("\r\n", string.Empty)
                                .Replace("</script>", "<\\/script>")                                
                                .Replace("jQuery(\"#", "jQuery(\"\\#");
            }

			//TODO: serialize column editor
			//if (!Grid.DataSource.IsReadOnly(Member) && Grid.Editable.Enabled && Grid.IsClientBinding)
			//{
			//    json["editor"] = editorHtml;
			//}

			if (ClientGroupHeaderTemplate.HasValue())
			{
				json["groupHeaderTemplate"] = ClientGroupHeaderTemplate;
			}

            SerializeValues(json);
        }

        private void SerializeValues(IDictionary<string, object> result)
        {
            if (MemberType != null && MemberType.IsEnumType())
            {
                var type = MemberType.GetNonNullableType();
                var values = new List<IDictionary<string, object>>();
                var underlyingType = Enum.GetUnderlyingType(type);

                foreach (var value in Enum.GetValues(type))
                {
                    var obj = new Dictionary<string, object>();

                    var name = Enum.GetName(type, value);
                    var member = type.GetMember(name).FirstOrDefault();

                    if (member != null)
                    {
                        var displayAttribute = member.GetCustomAttributes(typeof(DisplayAttribute), true)
                            .OfType<DisplayAttribute>()
                            .FirstOrDefault();

                        if (displayAttribute != null)
                        {
                            name = displayAttribute.GetName();
                        }
                    }

                    obj["value"] = Convert.ChangeType(value, underlyingType);
                    obj["text"] = name;

                    values.Add(obj);
                }

                result["values"] = values;
            }
        }
    }
}