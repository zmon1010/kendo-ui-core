namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq.Expressions;
    using Microsoft.AspNet.Mvc.Rendering;

    internal class ModelDynamicDataKey : IModelDataKey<object>
    {
        public ModelDynamicDataKey(string memberName, Expression<Func<object , object>> expression)
        {
            RouteKey = "id";
            Name = memberName;
            Expression = expression;
            Value = expression.Compile();
        }

        public string Name
        {
            get;
            private set;
        }

        public string RouteKey
        {
            get;
            set;
        }

        public Func<object, object> Value
        {
            get;
            private set;
        }

        public Expression<Func<object , object>> Expression
        {
            get;
            private set;
        }

        public object GetValue(object dataItem)
        {
            try
            {
                return Value(dataItem);
            }
            catch (Microsoft.CSharp.RuntimeBinder.RuntimeBinderException)
            {
                return null;
            }
        }

        public string HiddenFieldHtml(IHtmlHelper<object> htmlHelper)
        {
            return htmlHelper.Hidden(Name, null, new { id = "" }).ToString();
        }
    }
}