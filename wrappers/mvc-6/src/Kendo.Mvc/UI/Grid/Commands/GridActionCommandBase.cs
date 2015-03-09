namespace Kendo.Mvc.UI
{
	using System.Collections.Generic;
	using System.Linq;
	using Kendo.Mvc.Extensions;
	using Microsoft.AspNet.Routing;

	public abstract class GridActionCommandBase : IGridActionCommand
    {
        public virtual string Name
        {
            get;
            set;
        }

        public virtual string Text
        {
            get;
            set;
        }
        
        public IDictionary<string, object> HtmlAttributes
        {
            get;
            set;
        }
		
        public GridActionCommandBase()
        {            
            HtmlAttributes = new RouteValueDictionary();         
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var command = new Dictionary<string, object>();

            command            
                .Add("attr", HtmlAttributes.ToAttributeString(), HtmlAttributes.Any)				
				.Add("text", Text, (System.Func<bool>)Text.HasValue)
				.Add("name", Name);                

            return command;
        }
    }
}
